import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip"

interface StatCardProps {
    label: string;
    percentage: null | number ;
    value : string | number;
    tooltiptext : string;  // Tooltip content when hovering over the card.
}
const StatCard = ({ label, percentage, value, tooltiptext }: StatCardProps) => (
    <TooltipProvider delayDuration={50}>
        <Tooltip>
            <TooltipTrigger>
                <div className="flex h-full cursor-default flex-col justify-between space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm">
                    <p className="text-sm text-slate-600">
                        {label}
                        {percentage && percentage !== "NaN%" && (
                            <span className="ml-1 rounded-xl bg-slate-100 px-2 py-1 text-xs">{percentage}</span>
                        )}
                    </p>
                    <p className="text-2xl font-bold text-slate-800">{value}</p>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltiptext}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)

export const SummaryMetadata = () => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-x-2 lg:col-span-4">
                <StatCard 
                    label="Impressions"
                    percentage={null}
                    value={"-"}
                    tooltiptext="Number of times the form has been viewed."
                />
                <StatCard 
                    label="Starts"
                    percentage={null}
                    value={10}
                    tooltiptext="Number of times the form has been started."
                />
                <StatCard 
                    label="Completed"
                    percentage={null}
                    value={40}
                    tooltiptext="Number of times the form has been completed."
                />
            </div>
        </div>
    )
}