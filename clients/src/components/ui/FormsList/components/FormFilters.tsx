import type React from "react";
import { useState } from "react";
import { useDebounce } from "react-use";
import { FormFilterDropdown } from "./FormFilterDropdown";
import type { TFilterOption, TFormFilters, TSortOption } from "@/types/forms";
import { ChevronDownIcon, Grid2X2, List, Search, PlusIcon, X, Equal } from "lucide-react";
import { SortOption } from "./SortOption";
import { Input } from "@/components/ui/input";
import { Form, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import Button from "../../Button";
import { TooltipRenderer } from "../../Tooltip";

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
  { label: "Newest first", value: "updatedAt" },
  { label: "Created On", value: "createdAt" },
  { label: "Alphabetical", value: "name" },
];

export const FormFilters = ({ orientation, setOrientation, formFilters, setFormFilters }: FormFilterProps) => {
  const { environmentId } = useParams();
  const navigate = useNavigate();
  const { sortBy, status } = formFilters;
  const [name, setName] = useState("");

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

  const getToolTipContent = (orientation: string) => {
    return <div>{orientation} View</div>;
  };

  const handleOrientationChange = (orientation: string) => {
    setOrientation(orientation);
    localStorage.setItem("forms-orientation", orientation);
  };

  return (
    <div className="w-full flex md:flex-row flex-col justify-between sm:space-x-2">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0">
        {/* Search Input */}
        <div className="flex h-10 items-center rounded-lg border border-slate-300 bg-white px-3">
          <Search className="h-4 w-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-none bg-transparent placeholder:text-sm focus-visible:ring-0"
          />
        </div>

        {/* Dropdowns and Clear Status Button */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0">
          {/* Sort By Dropdown */}
          <div className="flex flex-row space-x-2">

          <div className="w-full md:w-40">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-8 w-full cursor-pointer rounded-md border border-slate-700 bg-white sm:px-2 flex items-center justify-between hover:bg-slate-100">
                  <span className="text-sm text-slate-700">
                    Sort by: {sortOptions.find((option) => option.value === sortBy)?.label}
                  </span>
                  <ChevronDownIcon className="mx-1h-4 w-4 text-slate-700" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white">
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

          {/* Status Dropdown */}
          <div className="w-full md:w-40">
            <FormFilterDropdown
              id="status"
              title="Status"
              options={statusOptions}
              selectedOptions={status}
              setSelectedOptions={handleStatusChange}
              isOpen={dropdownOpenStates.get("status")}
              toggleDropdown={() => toggleDropdown("status")}
              />
          </div>
          </div>

          {/* Clear Status Button */}
          {status.length > 0 && (
            <Button
            variant="darkCTA"
              size="sm"
              onClick={() => setFormFilters((prev) => ({ ...prev, status: [] }))}
              className="h-8 w-full md:w-auto flex items-center justify-center border border-slate-700"
              EndIcon={X}
              endIconClassName="h-4 w-4"
            >
              Clear Status
            </Button>
          )}
        </div>
      </div>

      {/* Orientation Toggle */}
      <div className="flex flex-row space-x-2 justify-end">
        <div className="flex flex-row space-x-2">
          <TooltipRenderer
            shouldRender={true}
            tooltipContent={getToolTipContent("List")}
            className="bg-slate-900 text-white">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg border p-1 ${orientation === "list" ? "bg-slate-900 text-white" : "bg-white"}`}
              onClick={() => handleOrientationChange("list")}>
              <List className="h-5 w-5" />
            </div>
          </TooltipRenderer>
          <TooltipRenderer
            shouldRender={true}
            tooltipContent={getToolTipContent("Grid")}
            className="bg-slate-900 text-white">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg border p-1 ${orientation === "grid" ? "bg-slate-900 text-white" : "bg-white"}`}
              onClick={() => handleOrientationChange("grid")}>
              <Grid2X2 className="h-5 w-5" />
            </div>
          </TooltipRenderer>
        </div>
        <Button
          variant="darkCTA"
          size="sm"
          onClick={() => navigate(`/environments/${environmentId}/forms/templates`)}
          className="h-8 w-full md:w-auto my-1 flex items-center justify-center bg-slate-900 text-white border border-slate-700"
          EndIcon={PlusIcon}
          endIconClassName="h-4 w-4"
        >
          New Form 
        </Button>
      </div>
    </div>
  );
};