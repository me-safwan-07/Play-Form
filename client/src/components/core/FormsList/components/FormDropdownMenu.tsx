import { DeleteDialog } from "@/components/ui/DeleteDialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/DropdownMenu"
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
import { useState } from "react";
// import toast from "react-hot-toast";
import { 
  Link, 
  // useNavigate 
} from "react-router-dom";

interface FormDropdownMenuProps {
  // form: TFormFilters;
  isFormCreationDeletionDisabled?: boolean;
  
}

export const FormDropdownMenu = ({
  // form,
  isFormCreationDeletionDisabled,
}: FormDropdownMenuProps) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // const navigate = useNavigate();
  
  const handleDeleteForm = async () => {
    setLoading(true);
    // try {
    //   const res = await axios.delete(`http://localhost:3000/api/forms/`);
    //   if (res.status === 200) {
    //     toast.success("Form deleted successfully.")
    //     navigate(`/`);
    //   } else {
    //     throw new Error("Failed to delete form");
    //   }
    //   // toast.success("Form deleted successfully.")
    // } catch (error) {
    //   console.error(error)
    //   toast.error("An error occured while deleting the form")
    // }
    // setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="spinner-border text-slate-400" role="status" />
      </div>
    )
  }

  return (
    <div>
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
                    to="#"
                    className="flex w-full items-center">
                    <SquarePenIcon className="mr-2 h-4 w-4"/>
                    Edit
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    type="button"
                    className="flex w-full items-center"
                  >
                    <CopyIcon className="mr-2 h-4 w-4" />
                    Duplicate
                  </button>
                </DropdownMenuItem>
              </>
            )}
            {/* {!isFormCreationDeletionDisabled && (
              <>
                <DropdownMenuItem>
                  <button
                    type="button"
                    className="flex w-full items-center"
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDropDownOpen(false);
                      setIsCopyFormOpen(true);
                    }}
                  >
                    <ArrowUpFromLineIcon />
                    Copy...
                  </button>
                </DropdownMenuItem>
              </>
            )} */}
            
            <DropdownMenuItem>
              <div className="flex w-full cursor-pointer items-center">
                <EyeIcon className="mr-2 h-4 w-4"/>
                Preview Survey
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                type="button"
                className="flex w-full items-center">
                <LinkIcon className="mr-2 h-4 w-4"/>
                Copy Link
              </button>
            </DropdownMenuItem>
                     
            {!isFormCreationDeletionDisabled && (
              <DropdownMenuItem>
                <button
                  type="button"
                  className="flex w-full items-center"
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
          onDelete={() => handleDeleteForm()}
          text = "Are you sure you want to delete this form and all of its responses? This action cannot be undone."
        />
      )}
    </div>
  )
}

export default FormDropdownMenu
