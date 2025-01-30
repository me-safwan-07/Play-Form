import React, { useState } from "react";
import { useDebounce } from "react-use";
import { FormFilterDropdown } from "./FormFilterDropdown";
import { TFilterOption, TFormFilters, TSortOption } from "@/types/forms";
import { ChevronDownIcon, Grid2X2, List, Search, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { SortOption } from "./SortOption";
import { Input } from "../../input";
import Button from "../../Button";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FormFilterProps {
  orientation: string;
  setOrientation: React.Dispatch<React.SetStateAction<string>>;
  formFilters: TFormFilters;
  setFormFilters: React.Dispatch<React.SetStateAction<TFormFilters>>;
}

export const initialFilters: TFormFilters = {
  name: "",
  status: [],
  sortBy: "updatedAt",
};

const statusOptions: TFilterOption[] = [
  { label: "In Progress", value: "inProgress" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Paused", value: "paused" },
  { label: "Completed", value: "completed" },
  { label: "Draft", value: "draft" },
];

const sortOptions: TSortOption[] = [
  { label: "Last Modified", value: "updatedAt" },
  { label: "Created On", value: "createdAt" },
  { label: "Alphabetical", value: "name" },
];

export const FormFilters = ({
  orientation,
  setOrientation,
  formFilters,
  setFormFilters,
}: FormFilterProps) => {
  const { sortBy, status } = formFilters;
  const [name, setName] = useState("");
  const { environmentId } = useParams();

  useDebounce(() => setFormFilters((prev) => ({ ...prev, name: name })), 800, [name]);

  const [dropdownOpenStates, setDropdownOpenStates] = useState(new Map());

  const toggleDropdown = (id: string) => {
    setDropdownOpenStates(new Map(dropdownOpenStates.set(id, !dropdownOpenStates.get(id))));
  };

  const handleStatusChange = (value: string) => {
    if (
      value === "inProgress" ||
      value === "paused" ||
      value === "completed" ||
      value === "draft" ||
      value === "scheduled"
    ) {
      if (status.includes(value)) {
        setFormFilters((prev) => ({ ...prev, status: prev.status.filter((v) => v !== value) }));
      } else {
        setFormFilters((prev) => ({ ...prev, status: [...prev.status, value] }));
      }
    }
  };

  const handleSortChange = (option: TSortOption) => {
    setFormFilters((prev) => ({ ...prev, sortBy: option.value }));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Filters Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            className="pl-8 w-full border border-gray-300 rounded-md"
            placeholder="Search by form name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Sort and Status Dropdowns */}
        <div className="flex flex-row sm:flex-row gap-2 w-full">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="w-1/2 formFilterDropdown h-full cursor-pointer border border-slate-700 outline-none hover:bg-slate-700"
            >
              <div className="h-8 rounded-md border flex items-center justify-center px-2">
                <span className="text-sm">
                  {sortOptions.find((option) => option.value === sortBy)?.label}
                </span>
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-slate-900">
              {sortOptions.map((option) => (
                <SortOption
                  key={option.value}
                  option={option}
                  sortBy={sortBy}
                  handleSortChange={handleSortChange}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Dropdown */}
          <FormFilterDropdown
            title="Status"
            id="status"
            options={statusOptions}
            selectedOptions={status}
            setSelectedOptions={handleStatusChange}
            isOpen={dropdownOpenStates.get("status") || false}
            toggleDropdown={toggleDropdown}
          />
        </div>

        {/* Grid/List View and New Form Button */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Grid/List View Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="darkCTA"
              size="icon"
              onClick={() => setOrientation("grid")}
              className={cn(
                orientation === "grid" ? "bg-black text-white" : "",
                "border border-slate-900"
              )}
            >
              <Grid2X2 className="w-4 h-4" />
            </Button>
            <Button
              variant="darkCTA"
              size="icon"
              onClick={() => setOrientation("list")}
              className={cn(
                orientation === "list" ? "bg-slate-900 text-white" : "",
                "border border-slate-900"
              )}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* New Form Button */}
          <Button
            size="sm"
            variant="darkCTA"
            className="bg-slate-900 text-white w-full md:w-auto"
            href={`/environments/${environmentId}/forms/template`}
            StartIcon={PlusIcon}
            startIconClassName="text-white"
          >
            New Form
          </Button>
        </div>
      </div>
    </div>
  );
};