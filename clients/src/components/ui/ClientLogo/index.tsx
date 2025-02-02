import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ClientLogoProps {
    environmentId?: string;
    previewForm?: boolean;
}

export const ClientLogo = ({
    environmentId,
    previewForm = false,
}: ClientLogoProps) => {
    return (
        <div 
            className={cn(previewForm ? "" : "left-0 top-0")}
            >
            <Link to={`/environments/${environmentId}/product/look`}
                onClick={(e) => {
                    if (!environmentId) {
                        e.preventDefault();
                    }
                }}
                className="whitespace-nowrap rounded-md border border-dashed border-slate-400 bg-slate-200 px-6 py-3 text-xs text-slate-900 opacity-50 backdrop-blur-sm hover:cursor-pointer hover:border-slate-600"
                target="_blank"
            >
                Add Logo
            </Link>
        </div>
    )
}

