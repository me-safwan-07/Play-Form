import { DeleteDialog } from "@/components/ui/DeleteDialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/DropdownMenu"
import { TForm } from "@/types/forms";
import axios from "axios";
// import { TFormFilters } from "@/types/forms";
// import axios from "axios";
import { 
  // ArrowUpFromLineIcon, 
  CopyIcon, 
  EyeIcon, 
  LinkIcon, 
  MoreVertical, 
  SquarePenIcon, 
  TrashIcon
} from "lucide-react"
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
import { 
  Link,
  useNavigate, 
  // useNavigate 
} from "react-router-dom";

interface FormDropdownMenuProps {
  form: TForm;
  environment: string;
  isFormCreationDeletionDisabled?: boolean;
  duplicateForm: (form: TForm) => void;
  deleteForm: (form: string) => void;

}

export const FormDropdownMenu = ({
  form,
  environment,
  isFormCreationDeletionDisabled,
  deleteForm,
}: FormDropdownMenuProps) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const formUrl = useMemo(() => 'https://localhost:5173' + "/s/" + form.id, [form.id]);
  const handleDeleteForm = async (form: TForm) => {
    setLoading(true);
    try {
      const res = await axios.delete(`http://localhost:3000/api/forms/${form.id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.status === 200) {
        deleteForm(form.id);
        // naviate refresh
        navigate(0);
        setDeleteDialogOpen(false);
        toast.success("Form deleted successfully.")
      } else {
        throw new Error("Failed to delete form");
      }
      // toast.success("Form deleted successfully.")
    } catch (error) {
      console.error(error)
      toast.error("An error occured while deleting the form")
    }
    setLoading(false);
  };


  const duplicateFormAndRefresh = async (formId: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/forms/${formId}/duplicate`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === 200) {
        navigate(0);
        toast.success("Form duplicated successfully");
      } else {
        throw new Error("Failed to duplicate form");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured while duplicating the form");
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="spinner-border text-slate-400" role="status" />
      </div>
    )
  }

  return (
    <div
      id={`${form.name.toLowerCase().split(" ").join("-")}-form`}
      onClick={(e) => e.stopPropagation()}
    >
      <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
        <DropdownMenuTrigger className="z-10 cursor-pointer" asChild>
          <div className="rounded-lg border p-2 hover:bg-slate-50">
            <span className="sr-only">Open options</span>
            <MoreVertical className="h-4 w-4" aria-hidden="true" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            {!isFormCreationDeletionDisabled && (
              <>
                <DropdownMenuItem>
                  <Link
                    to={`/environments/${environment}/forms/${form.id}/edit`}
                    className="flex w-full items-center">
                    <SquarePenIcon className="mr-2 h-4 w-4"/>
                    Edit
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    type="button"
                    className="flex w-full items-center"
                    onClick={async (e) => {
                      e.preventDefault();
                      setIsDropDownOpen(false);
                      await duplicateFormAndRefresh(form.id);
                    }}
                  >
                    <CopyIcon className="mr-2 h-4 w-4" />
                    Duplicate
                  </button>
                </DropdownMenuItem>
              </>
            )}
            {form.status !== "draft" && ( 
              <>
                <DropdownMenuItem>
                  <div 
                    className="flex w-full cursor-pointer items-center"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropDownOpen(false);
                  const previewUrl = `https://localhost:5173/s/${form.id}?preview=true`;
                  window.open(previewUrl, '_blank');
                }}
              >
                <EyeIcon className="mr-2 h-4 w-4"/>
                    Preview Survey
                  </div>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem>
              <button
                type="button"
                className="flex w-full items-center"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropDownOpen(false);
                  navigator.clipboard.writeText(formUrl && (formUrl));
                  toast.success("Link copied to clipboard");
                  navigate(0);
                }}
                >
                <LinkIcon className="mr-2 h-4 w-4"/>
                Copy Link
              </button>
            </DropdownMenuItem>
                     
            {!isFormCreationDeletionDisabled && (
              <DropdownMenuItem>
                <button
                  type="button"
                  className="flex w-full items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDropDownOpen(false);
                    setDeleteDialogOpen(true);
                  } }
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {!isFormCreationDeletionDisabled && (
        <DeleteDialog 
          deleteWhat="Form"
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onDelete={() => handleDeleteForm(form)}
          text = "Are you sure you want to delete this form and all of its responses? This action cannot be undone."
        />
      )}
    </div>
  )
}

export default FormDropdownMenu
