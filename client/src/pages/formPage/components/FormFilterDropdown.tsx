import { DropdownMenu } from "@/components/ui/DropdownMenu"
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "lucide-react"

// export const FormFilterDropdown = ({title}: FormFilterDropdownProps) => {

export const FormFilterDropdown = (

) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="">
          <span></span>
          <ChevronDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FormFilterDropdown
