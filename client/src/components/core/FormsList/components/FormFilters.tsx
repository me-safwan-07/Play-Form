import React, { useState } from "react";
import { useDebounce } from "react-use";
import { SurveyFilterDropdown } from "./FormFilterDropdown";
import { TFilterOptions, TFormFilters, TSortOption } from "@/types/forms";
import { TooltipRenderer } from "@/components/ui/Tooltip";
import { ChevronDownIcon, Equal, Grid2X2, Search, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { SortOption } from "./SortOption";
import Button from "@/components/ui/Button/index";

interface FormFilterProps {
  orientation: string;
  setOrientation: (orientation: string) => void;
  formFilters: TFormFilters,
  setFormFilters: React.Dispatch<React.SetStateAction<TFormFilters>>;
}

export const initialFilters: TFormFilters = {
  name: "",
  status: [],
  sortBy: "updatedAt"
}
// const creatorOptions: TFilterOptions[] = [
//     { label: "you", value: "you" },
//     { label: "Others", value: "others"},
// ];

const statusOptions: TFilterOptions[] = [
    { label: "In Progress", value: "inProgress" },
    { label: "Scheduled", value: "scheduled" },
    { label: "Paused", value: "paused" },
    { label: "Completed", value: "completed" },
    { label: "Draft", value: "draft" },
];

const sortOptions: TSortOption[] = [
    {
      label: "Last Modified",
      value: "updatedAt",
    },
    {
      label: "Created On",
      value: "createdAt",
    },
    {
      label: "Alphabetical",
      value: "name",
    },
    {
      label: "Relevance",
      value: "relevance",
    },
];

const getTooltipContent = (orientation: string) => {
  return <div className="">{orientation} view</div>
};

export const FormFilters = ({
  orientation,
  setOrientation,
  formFilters,
  setFormFilters
}: FormFilterProps) => {
  const { sortBy, status } = formFilters;
  const [name, setName] = useState("");
  useDebounce(() => setFormFilters((prev) => ({ ...prev, name: name })), 800, [name]);
  const [dropdownOpenStates, setDropdownOpenStates] = useState(new Map());
  
  const toggleDropdown = (id: string) => {
    setDropdownOpenStates(new Map(dropdownOpenStates).set(id, !dropdownOpenStates.get(id)));
  }
  const handleStatusChange = (value: string) => {
    if (
      value === "inProgress" || 
      value === "paused" ||
      value === "completed" ||
      value === "draft" ||
      value === "scheduled"
    )  {
      if (status.includes(value)) {
        setFormFilters((prev) => ({ ...prev, status: prev.status.filter((v) => v !== value)}));
      } else {
        setFormFilters((prev) => ({...prev, status: [...prev.status, value] }));
      }
    }
  };
  const handleOrientationChange = (value: string) => {
    setOrientation(value);
    localStorage.setItem("formOrientation", value);
  };
  return (
    <div className="flex justify-between">
      <div className="flex space-x-2">
        <div className="flex h-8 items-center rounded-lg border border-slate-300 bg-white px-4">
          <Search className="h-4 w-4"/>
          <input
            type="text"
            className="border-none bg-transparent placeholder:text-sm"
            placeholder="Search by survey name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* <div>
          <SurveyFilterDropdown 
            title="Created By"
            id="createdBy"
            options={creatorOptions}
            selectedOptions={cr}
          />
        </div> */}
        <div>
          <SurveyFilterDropdown 
            title="Status"
            id="status"
            options={statusOptions}
            selectedOptions={status}
            setSelectedOptions={handleStatusChange}
            isOpen={dropdownOpenStates.get("createdBy")}
            toggleDropdown={toggleDropdown}
          />
        </div>
        {status.length > 0 && (
          <Button
            variant="darkCTA"
            size="sm"
            onClick={() => {
              setFormFilters(initialFilters);
            }}
            className="h-8 bg-slate-900 text-white"
            EndIcon={X}
            endIconClassName="h-4 w-4">
            Clear Filters
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        <TooltipRenderer
          shouldRender={true}
          tooltipContent={getTooltipContent("List")}
          className="bg-slate-900 text-white"
        >
          <div 
            className={`flex h-8 w-8 items-center justify-center rounded-lg border p-1 ${orientation === "list" ? "bg-slate-900 text-white" : "bg-white"}`}
            onClick={() => handleOrientationChange("list")}
            >
              <Equal className="h-5 w-5" />
          </div>
        </TooltipRenderer>
        
        <TooltipRenderer
          shouldRender={true}
          tooltipContent={getTooltipContent("Grid")}
          className="bg-slate-900 text-white"
        >
          <div 
            className={`flex h-8 w-8 items-center justify-center rounded-lg border p-1 ${orientation === "grid" ? "bg-slate-900 text-white" : "bg-white"}`}
            onClick={() => handleOrientationChange("grid")}
            >
              <Grid2X2 className="h-5 w-5" />
          </div>
        </TooltipRenderer>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="formFilterDropdown h-full cursor-pointer border border-slate-700 outline-none hover:bg-slate-900">
            <div className="min-w-auto h-8 rounded-md border sm:flex sm:px-2">
              <div className="hidden w-full items-center justify-center hover:text-white sm:flex">
                <span>
                  Sort by: {sortOptions.find((option) => option.value === sortBy)?.label}
                </span>
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-slate-900">
            {sortOptions.map((option) => (
                <SortOption 
                  option={option}
                  key={option.label}
                  sortBy={formFilters.sortBy}
                  handleSortChange={(e) => e}
                />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
