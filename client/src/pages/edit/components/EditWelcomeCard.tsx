import { FileInput } from "@/components/ui/FileInput";
import { Label } from "@/components/ui/Label";
import { QuestionFormInput } from "@/components/ui/QuestionFormInput";
import { Switch } from "@/components/ui/Switch";
import { cn } from "@/lib/utils";
import { TForm } from "@/types/forms";
import * as Collapsible from "@radix-ui/react-collapsible";
// import { FileInput } from "lucide-react";
import { useState } from "react"
import { useLocation } from "react-router-dom";

interface EditWelcomeCardProps {
    form: TForm;
    setActiveQuestionId: (id: string | null) => void;
    activeQuestionId: string | null;

}

export const EditWelcomeCard = ({
    form,
    setActiveQuestionId,
    activeQuestionId,
}: EditWelcomeCardProps) => {
    const [firstReander, setFirstReander] = useState(true);
    const path = useLocation().pathname;
    // const evvironmentId = path?.split("/environments/")[1]?.split('/')[0];

    let open = activeQuestionId == "start";

    const setOpen = (e: any) => {
        if (e) {
            setActiveQuestionId("start");
            setFirstReander(true);
        } else {
            setActiveQuestionId(null);
        }
    };
    

    return (
        <div className={cn(
            open ? "scale-100 shadow-lg" : "scale-97 shadow-md",
            "group flex flex-row rounded-lg bg-white transition-transform duration-300 ease-in-out"
        )}>
            <div className={cn(
                "flex w-10 items-center justify-center rounded-l-lg border-b border-l border-t group-aria-expanded:rounded-bl-none bg-white group-hover:bg-slate-50"
            )}>
                <p className="">✋</p>
            </div>
            <Collapsible.Root
                open={open}
                onOpenChange={setOpen}
                className="flex-1 rounded-r-lg border border-slate-200 transition-all duration-300 ease-in-out"
            >
                <Collapsible.CollapsibleTrigger
                    asChild
                    className="flex cursor-pointer justify-between p-4 hover:bg-slate-50"
                >
                    <div>
                        <div className="inline-flex">
                            <div className="">
                                <p className="text-sm font-semibold">Welcome Card</p>
                                {!open && (
                                    <p className="mt-1 truncate text-xs text-slate-500">
                                        {form?.welcomeCard?.enabled ? "Shown": "Hidden"}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Label htmlFor="welcome-toggle">{form?.welcomeCard?.enabled  ? "On" : "Off"}</Label>
                            <Switch
                                id="welcome-toggle"
                                checked={form?.welcomeCard?.enabled}
                                // create the onClick
                            />
                        </div>
                    </div>
                </Collapsible.CollapsibleTrigger>
                
                <Collapsible.CollapsibleContent className="px-4 pb-6">
                    <div className="">
                        <Label>Company Logo</Label>
                    </div>
                    <div className="">
                        <FileInput 
                        />
                    </div>
                    <div className="">
                        {/* QuestionFormInput */}
                        <QuestionFormInput 
                            id="headline"
                            value={form.welcomeCard.headline}
                            localSurvey={form}
                            label="Note*"
                            questionIdx={-1}
                        />
                    </div>
                    <div className="">
                        <Label>Welcome Message</Label>
                        <div className="">
                            {/* LocalizedEditor */}
                            
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                {/* QuestionFormInput */}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            {/* Switch */}
                            
                        </div>
                        <div className="flex-column">
                            <Label>Time to Finish</Label>
                            <div className="ext-sm text-slate-500 dark:text-slate-400">
                                Display an estimate of completion time for survey
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                {/* Switch */}
                            </div>
                            <div className="flex-column">
                                <Label>Show Response Count</Label>
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                    Display number of responses for survey
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapsible.CollapsibleContent>
            </Collapsible.Root>
        </div>
    )
}