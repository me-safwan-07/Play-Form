import { Checkbox } from "@/components/ui/Checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const ResponseFilter = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setIsOpen(false);
        }
    }
    return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger className="flex min-w-[8rem] items-center justify-between rounded border border-slate-200 bg-white p-3 text-sm text-slate-600 hover:border-slate-300 sm:min-w-[11rem] sm:px-6 sm:py-3">
                Filter
                <div className="ml-3">
                    {isOpen ? (
                        <ChevronUp className="ml-2 h-4 w-4 opacity-50"/>
                    ) : (
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="w-[300px] border-slate-200 bg-slate-100 p-6 sm:w-[400px] md:w-[750px] lg:w-[1000px]"
            >
                <div className="mb-8 flex flex-wrap item-start justify-between">
                    <p className="hidden text-lg font-bold text-black sm:block">Show all responses that match</p>
                    <p className="block text-base text-slate-500 sm:hidden">Show all responses where...</p>
                    <div className="flex items-center space-x-2.5">
                        <label className="text-sm font-normal text-slate-600">Only completed</label>
                        <Checkbox 
                            className={clsx('rounded-md')}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}