import { SurveyStatusIndicator } from "@/components/ui/SurveyStatusIndicator";
import { convertDateString, timeSince } from "@/lib/time";
import { cn } from "@/lib/utils";
import FormDropdownMenu from "@/components/core/FormsList/components/FormDropdownMenu";
import { TFormFilters } from "@/types/forms";
import { useMemo } from "react";
import { Link } from "react-router-dom";

interface FormCardProps {
    form: TFormFilters;
    orientation: string;
}

export const FormCard = ({ 
    form, orientation 
}: FormCardProps) => {
    const formStatusLabel = useMemo(() => {
        if (form.status === "inProgress") return "In Progress";
        else if (form.status === "scheduled") return "Scheduled";
        else if (form.status === "completed") return "Completed";
        else if (form.status === "draft") return "Draft";
        else if (form.status === "paused") return "Paused";
    }, [form]);

    const renderListContent = () => {
        return (
            <Link
                to={`/forms/${form.id}`}
                key={form.id}
                className="relative grid w-full grid-cols-8 place-items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all ease-in-out hover:scale-[101%]"
            >
                <div className="col-span-2 flex max-w-full items-center justify-self-start text-sm font-medium text-slate-900">
                    <div className="w-full truncate">{form.name}</div>
                </div>
                <div className="flex w-fit items-center gap-2 rounded-full py-1">
                    <SurveyStatusIndicator status={form.status}/> {formStatusLabel}{" "}
                </div>

                <div className="col-span-4 grid w-full grid-cols-5 place-items-center">
                    <div className="col-span-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-600">
                        {convertDateString(form.createdAt.toString())}
                    </div>
                    <div className="col-span-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-600">
                        {timeSince(form.updatedAt.toString())}
                    </div>
                    <div className="place-self-end">
                        <FormDropdownMenu 
                            FormDropdownMenuProps={false}
                        />
                    </div>
                </div>
            </Link>
        )
    }
    const renderGridContent = () => {
        return (
            <Link
                to={`/forms/${form.id}`}
                key={form.id}
                className="relative col-span-1 flex h-44 flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all ease-in-out"
            >
                <div className="flex justify-between">
                    <FormDropdownMenu 
                        FormDropdownMenuProps={false}
                    />
                </div>
                <div>
                    <div className="text-md font-medium text-slate-900">{form.name}</div>
                    <div 
                        className={cn(
                            "mt-3 flex w-fit items-center gap-2 rounded-full py-1 pl-1 pr-2 text-xs text-slate-800",
                            formStatusLabel === "Scheduled" && "bg-slate-200",
                            formStatusLabel === "In Progress" && "bg-emerald-50",
                            formStatusLabel === "Completed" && "bg-slate-200",
                            formStatusLabel === "Draft" && "bg-slate-100",
                            formStatusLabel === "Paused" && "bg-slate-100"
                    )}>
                    <SurveyStatusIndicator status={form.status} /> {formStatusLabel}
                    </div>
                </div>
            </Link>
        )
    }

    if (orientation === "grid") {
        return renderGridContent();
    } else return renderListContent();
}