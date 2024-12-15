import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { ResponseFilter } from "./ResponseFilter"
// import { differenceInDays } from "date-fns";
import { useRef, useState } from "react";
import { ArrowDownIcon, ChevronDown, ChevronUp } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";

enum FilterDropDownLabels {
  ALL_TIME = "All time",
  LAST_7_DAYS = "Last 7 days",
  LAST_30_DAYS = "Last 30 days",
  CUSTOM_RANGE = "Custom range...",
}


// const getDifferenceOfDays = (from: Date, to:Date) => {
//   const days = differenceInDays(to, from);
//   if (days === 7) {
//     return FilterDropDownLabels.LAST_7_DAYS;
//   } else if (days === 30) {
//     return FilterDropDownLabels.LAST_30_DAYS;
//   } else {
//     return FilterDropDownLabels.CUSTOM_RANGE;
//   }
// };

export const CustomFilter = () => {
    const [filterRange, setFilterRange] = useState<FilterDropDownLabels>(
        FilterDropDownLabels.ALL_TIME
    )
    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
    const [isFilterDropDownOpen, setIsFilterDropDownOpen] = useState<boolean>(false);

    const datePickerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="relative flex justify-between">
                <div className="flex justify-stretch gap-x-1.5">
                    <ResponseFilter />
                    <DropdownMenu
                        onOpenChange={(value) => {
                            setIsFilterDropDownOpen(value);
                        }}
                    >
                        <DropdownMenuTrigger>
                            <div className="flex min-w-[8rem] items-center justify-between rounded-md border border-slate-200 bg-white p-3 hover:border-slate-300 sm:min-w-[11rem] sm:px-6 sm:py-3">
                                <span className="text-sm text-slate-700">
                                    {filterRange}
                                </span>
                                {isFilterDropDownOpen ? (
                                    <ChevronUp className="ml-2 h-4 w-4 opacity-50"/>
                                ) : (
                                    <ChevronDown className="ml-2 h-4 w-4 opacity-50"/>
                                )}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                className="hover:ring-0"
                                onClick={() => {
                                    setFilterRange(FilterDropDownLabels.ALL_TIME);
                                }}
                            >
                                <p className="text-slate-700">All time</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setFilterRange(FilterDropDownLabels.LAST_7_DAYS);
                                }}
                            >
                                <p className="text-slate-700">Last 7 days</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setFilterRange(FilterDropDownLabels.LAST_30_DAYS);
                                }}
                            >
                                <p className="text-slate-700">Last 30 days</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setIsDatePickerOpen(true)
                                    setFilterRange(FilterDropDownLabels.CUSTOM_RANGE);
                                }}
                            >
                                <p className="text-slate-700">Custom range</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="min-w-auto h-auto rounded-md border border-slate-200 bg-white p-3 hover:border-slate-300 sm:flex sm:px-6 sm:py-3">
                                <div className="hidden w-full items-center justify-between sm:flex">
                                    <span className="text-sm text-slate-700">Dowload</span>
                                    <ArrowDownIcon className="ml-2 h-4 w-4" />
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                className="hover:ring-0"
                            >
                                <p className="text-slate-700">All responses (Excel)</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="hover:ring-0"
                            >
                                <p className="text-slate-700">Current selection (csv)</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {isDatePickerOpen && (
                    <div ref={datePickerRef} className="absolute top-full z-50 my-2 rounded-md border bg-white">
                        <Calendar 
                            initialFocus
                            mode="range"
                            numberOfMonths={2}
                            classNames={{
                                day_today: "hover:bg-slate-200 bg-white"
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    )
}