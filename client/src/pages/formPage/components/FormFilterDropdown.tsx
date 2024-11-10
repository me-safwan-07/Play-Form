import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface SurveyFilterDropdownProps {
  title: string;
  id: "createdBy" | "status" | "type";
  options: string[];
  selectedOptions?: string[];
  setSelectedOptions?: (value: string[]) => void;
  isOpen?: boolean;
  toggleDropdown?: (id: string) => void;
}

export const SurveyFilterDropdown = ({
  title,
  id,
  options,
  selectedOptions,
  setSelectedOptions,
  isOpen,
  toggleDropdown,
}: SurveyFilterDropdownProps) => {
  // const handleOptionClick = (option: string) => {
  //   setSelectedOptions(
  //     selectedOptions.includes(option)
  //       ? selectedOptions.filter((item) => item !== option)
  //       : [...selectedOptions, option]
  //   );
  // };

  // const triggerClasses = `surveyFilterDropdown min-w-auto h-8 rounded-md border border-slate-700 sm:px-2 cursor-pointer outline-none 
  //   ${selectedOptions.length > 0 ? "bg-slate-900 text-white" : "hover:bg-slate-900"}`;

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger asChild>
        <div className={""}>
          <div className="flex w-full items-center justify-between">
            <span className="text-sm">{title}</span>
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-slate-900">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            className="m-0 p-0"
            onSelect={(e) => {
              e.preventDefault();
              // handleOptionClick(option);
            }}>
            <div className="flex h-full w-full items-center space-x-2 px-2 py-1 hover:bg-slate-700">
              {/* <Checkbox
                checked={selectedOptions.includes(option)}
                // className={`bg-white ${selectedOptions.includes(option) ? "bg-brand-dark border-none" : ""}`}
              /> */}
              <p className="font-normal text-white">{option}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
