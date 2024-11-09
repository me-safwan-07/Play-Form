import { DeleteDialog } from "@/components/ui/DeleteDialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/DropdownMenu"
import { 
  ArrowUpFromLineIcon, 
  CopyIcon, 
  EyeIcon, 
  LinkIcon, 
  MoreVertical, 
  SquarePenIcon, 
  TrashIcon
} from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface FormDropdownMenuProps {
  isFormCreationDeletionDisabled?: boolean;
  surveyType: string;
}

export const FormDropdownMenu = ({
  isFormCreationDeletionDisabled,
  surveyType
}: FormDropdownMenuProps) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isCopyFormOpen, setIsCopyFormOpen] = useState(false);

  const navigate = useNavigate();
  
  const handleDeleteForm = async (surveyId: string) => {
    setLoading(true);
    try {
      // await deleteForm(surveyId);
      // add to pag refresh
      navigate(0)
      setDeleteDialogOpen(false);
      toast.success("Form deleted successfully.")
    } catch (error) {
      toast.error("An error occured while deleting the form")
    }
    setLoading(false);
  }



  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="">
            <span>Open options</span>
            <MoreVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuGroup>
            {!isFormCreationDeletionDisabled && (
              <>
                <DropdownMenuItem>
                  <Link
                    to="#"
                    className=""
                  >
                    <SquarePenIcon />
                    Edit
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    type="button"
                    className=""
                  >
                    <CopyIcon className="" />
                    Duplicate
                  </button>
                </DropdownMenuItem>
              </>
            )}
            {!isFormCreationDeletionDisabled && (
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
            )}
            {surveyType === "link" && (
              <>
                <DropdownMenuItem>
                  <div className="">
                    <EyeIcon />
                    Preview Survey
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button>
                    <LinkIcon />
                    Copy Link
                  </button>
                </DropdownMenuItem>
              </>
            )}
            {!isFormCreationDeletionDisabled && (
              <DropdownMenuItem>
                <button>
                  <TrashIcon className="" />
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
          onDelete={() => handleDeleteForm("asdfsd")}
          text = "Are you sure you want to delete this form and all of its responses? This action cannot be undone."
        />
      )}
    </div>
  )
}

export default FormDropdownMenu
