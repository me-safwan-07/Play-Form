// FILEPATH: /path/to/FormCard.tsx
import { SurveyStatusIndicator } from "@/components/ui/SurveyStatusIndicator";
import { convertDateString, timeSince } from "@/lib/time";
import { cn } from "@/lib/utils";
import { TForm, TFormFilters } from "@/types/forms";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { TEnvironment } from "@/types/environment";
import FormDropdownMenu from "./FormDropdownMenu";

interface FormCardProps {
    form: TForm;
    environment: string;
    orientation: string;
    duplicateForm: (forms: TForm) => void;
    deleteForm: (formsId: string) => void;
}

export const FormCard = ({ 
    form,
    environment,
    orientation,
    duplicateForm,
    deleteForm,
}: FormCardProps) => {
    const { environmentId } = useParams();
    const formStatusLabel = useMemo(() => {
        if (form.status === "inProgress") return "In Progress";
        else if (form.status === "scheduled") return "Scheduled";
        else if (form.status === "completed") return "Completed";
        else if (form.status === "draft") return "Draft";
        else if (form.status === "paused") return "Paused";
    }, [form.status]);

    const linkHref = useMemo(() => {
        return form.status === 'draft'
            ? `/environments/${environmentId}/forms/${form.id}/edit`
            : `/environments/${environmentId}/forms/${form.id}/analysis/summary`
    }, [form.status, form.id]); 

    const renderListContent = () => {
        return (
            <Link
                to={linkHref}
                key={form.id}
                className="w-full flex flex-row md:grid-cols-8 place-items-center gap-2 md:gap-3 rounded-xl border border-slate-200 bg-white p-2 md:p-4 shadow-sm transition-all ease-in-out hover:scale-[101%]"
                >
                {/* Form Name (Full width on mobile, col-span-2 on desktop) */}
                <div className="col-span-1 md:col-span-2 flex w-full items-center justify-self-start text-sm font-medium text-slate-900">
                    <div className="w-full truncate">{form.name}</div>
                </div>

                {/* Status Indicator (Full width on mobile, auto width on desktop) */}
                <div className=" col-span-1 md:flex w-full md:w-fit items-center gap-2 rounded-full py-1">
                    <SurveyStatusIndicator status={form.status} /> 
                    <div className="hidden md:block">{formStatusLabel}</div>
                </div>

                {/* Additional Details (Hidden on mobile, visible on desktop) */}
                <div className="hidden md:grid col-span-4 w-full grid-cols-5 place-items-center">
                    {/* Created At */}
                    <div className="col-span-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-600">
                    {convertDateString(form.createdAt.toString())}
                    </div>

                    {/* Updated At */}
                    <div className="col-span-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-600">
                    {timeSince(form.updatedAt.toString())}
                    </div>

                    {/* Dropdown Menu */}
                    <div className="place-self-end">
                        <FormDropdownMenu />
                    </div>
                </div>

                {/* Mobile-Specific Dropdown Menu (Visible on mobile, hidden on desktop) */}
                <div className="md:hidden w-full flex justify-end">
                    <FormDropdownMenu />
                </div>
                </Link>
        )
    }
    const renderGridContent = () => {
        return (
            <Link
                to={linkHref}
                key={form.id}
                className="relative col-span-1 flex h-44 flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all ease-in-out"
            >
                <div className="flex justify-between">
                    <FormDropdownMenu />
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