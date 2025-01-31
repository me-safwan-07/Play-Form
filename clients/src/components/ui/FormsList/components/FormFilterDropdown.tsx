import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { ChevronDownIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { TFilterOption } from "@/types/forms";

interface SurveyFilterDropdownProps {
  title: string;
  id: "createdBy" | "status";
  options: TFilterOption[];
  selectedOptions: string[];
  setSelectedOptions: (value: string) => void;
  isOpen: boolean;
  toggleDropdown: (id: string) => void;
}

export const FormFilterDropdown = ({
  title,
  id,
  options,
  selectedOptions,
  setSelectedOptions,
  isOpen,
  toggleDropdown,
}: SurveyFilterDropdownProps) => {
  const triggerClasses = `formFilterDropdown min-w-auto h-8 rounded-md border border-slate-700 px-2 cursor-pointer outline-none 
    ${selectedOptions.length > 0 ? "bg-slate-900 text-white" : "hover:bg-slate-900"}`;

  return (
    <DropdownMenu open={isOpen} onOpenChange={() => toggleDropdown(id)}>
      <DropdownMenuTrigger asChild className={triggerClasses}>
        <div className="flex w-full items-center justify-between">
          <span className="text-sm">{title}</span>
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-slate-900 z-50">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="m-0 p-0"
            onSelect={(e: Event) => {
              e.preventDefault();
              setSelectedOptions(option.value);
            }}>
            <div className="flex h-full w-full items-center space-x-2 px-2 py-1 hover:bg-slate-700">
              <Checkbox
                checked={selectedOptions.includes(option.value)}
                className={`bg-white ${selectedOptions.includes(option.value) ? "bg-brand-dark border-none" : ""}`}
              />
              <p className="font-normal text-white">{option.label}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
