import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SurveyStatusIndicator } from "@/components/ui/SurveyStatusIndicator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip"
import { TForm } from "@/types/forms"
import { CheckCircle2Icon, PauseCircleIcon, PlayCircleIcon } from "lucide-react"

interface FormStatusDropdownProps {
    form: TForm
}

export const FormStatusDropdown = ({
    form
}: FormStatusDropdownProps) => {
    return (   
        <>
            {form.status === 'draft' ? (
                <div className="flex items-center">
                    <p className="text-sm italic text-slate-600">Draft</p>
                </div>
            ) : (
                <Select
                    value={form.status}
                    // onValueChange={}
                >
                    <TooltipProvider delayDuration={50}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <SelectTrigger className="w-[170px] bg-white py-6 md:w-[200px]">
                                    <SelectValue>
                                        <div className="flex item-center">
                                            <SurveyStatusIndicator status={form.status}/>
                                            <span className="ml-2 text-sm text-slate-700">
                                                {form.status === "scheduled" && "Scheduled"}
                                                {form.status === "inProgress" && "In-progress"}
                                                {form.status === "paused" && "Paused"}
                                                {form.status === "completed" && "Completed"}
                                            </span>
                                        </div>
                                    </SelectValue>
                                </SelectTrigger>
                            </TooltipTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem className="group font-normal hover:text-slate-900" value="inProgress">
                                    <PlayCircleIcon className="-mt-1 mr-1 inline h-5 w-5 text-slate-500 group-hover:text-slate-800" />
                                    In-progress
                                </SelectItem>
                                <SelectItem className="group font-normal hover:text-slate-900" value="paused">
                                    <PauseCircleIcon className="-mt-1 mr-1 inline h-5 w-5 text-slate-500 group-hover:text-slate-800" />
                                    Paused
                                </SelectItem>
                                <SelectItem className="group font-normal hover:text-slate-900" value="completed">
                                    <CheckCircle2Icon className="-mt-1 mr-1 inline h-5 w-5 text-slate-500 group-hover:text-slate-800" />
                                    Completed
                                </SelectItem>
                            </SelectContent>

                            <TooltipContent>
                                To update the survey status, update the schedule and close setting in the survey response
                                options.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Select>
            )}
        </>
    
    );
};