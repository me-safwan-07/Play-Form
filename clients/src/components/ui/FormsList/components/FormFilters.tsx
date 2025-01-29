import React, { useState } from "react";
import { useDebounce } from "react-use";
import { FormFilterDropdown } from "./FormFilterDropdown";
import { TFilterOption, TFormFilters, TSortOption } from "@/types/forms";
import { ChevronDownIcon, Search, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { SortOption } from "./SortOption";
import Button from "@/components/ui/Button/index";

interface FormFilterProps {
  formFilters: TFormFilters,
  setFormFilters: React.Dispatch<React.SetStateAction<TFormFilters>>;
}

export const initialFilters: TFormFilters = {
  name: "",
  status: [],
  sortBy: "updatedAt"
}

const statusOptions: TFilterOption[] = [
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
];

export const FormFilters = ({
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

  const handleSortChange = (option: TSortOption) => {
    setFormFilters((prev) => ({ ...prev, sortBy: option.value }));
  };

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
      {/* Search Input */}
      <div className="w-full md:w-auto">
        <div className="flex h-8 w-full items-center rounded-lg border border-slate-300 bg-white px-4 md:w-64">
          <Search className="h-4 w-4"/>
          <input
            type="text"
            className="w-full border-none bg-transparent placeholder:text-sm"
            placeholder="Search by survey name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      {/* Status Filter and Clear Filters Button */}
      <div className="flex w-full space-x-2 md:w-auto">
        <div className="w-1/2 md:w-auto">
          <FormFilterDropdown 
            title="Status"
            id="status"
            options={statusOptions}
            selectedOptions={status}
            setSelectedOptions={handleStatusChange}
            isOpen={dropdownOpenStates.get("createdBy")}
            toggleDropdown={toggleDropdown}
          />
        </div>
        {/* Sort Dropdown */}
        <div className="w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="formFilterDropdown h-full w-full cursor-pointer border border-slate-700 outline-none hover:bg-slate-900 md:w-auto">
              <div className="min-w-auto h-8 rounded-md border sm:flex sm:px-2">
                <div className="flex w-full items-center justify-center hover:text-white text-xs md:text-sm">
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
                    handleSortChange={handleSortChange}
                  />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {status.length > 0 && (
        <div className="w-full md:w-auto">
          <Button
            variant="darkCTA"
            size="sm"
            onClick={() => {
              setFormFilters(initialFilters);
            }}
            className="h-8 w-full bg-slate-900 text-white md:w-auto flex items-center justify-center"
            EndIcon={X}
            endIconClassName="h-4 w-4">
            Clear Filters
          </Button>
        </div>
      )}

    </div>
  )
}