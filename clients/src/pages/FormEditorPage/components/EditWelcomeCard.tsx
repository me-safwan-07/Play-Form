// import { FileInput } from "@/components/ui/FileInput";
import { Label } from "@/components/ui/Label";
import { QuestionFormInput } from "@/components/ui/QuestionFormInput";
import { Switch } from "@/components/ui/Switch";
import { cn } from "@/lib/utils";
import { TForm } from "@/types/forms";
import * as Collapsible from "@radix-ui/react-collapsible";
// import { FileInput } from "lucide-react";
// import { useState } from "react"
// import { useLocation } from "react-router-dom";

interface EditWelcomeCardProps {
    localForm: TForm;
    setLocalForm: (localForm: TForm) => void;
    setActiveQuestionId: (id: string | null) => void;
    activeQuestionId: string | null;
    isInvalid: boolean;
}

export const EditWelcomeCard = ({
    localForm,
    setLocalForm,
    setActiveQuestionId,
    activeQuestionId,
    isInvalid
}: EditWelcomeCardProps) => {
    // const [firstReander, setFirstReander] = useState(true);
    // const path = useLocation().pathname;

    const open = activeQuestionId == "start";

    const setOpen = (e: boolean) => {
        if (e) {
            setActiveQuestionId("start");
            // setFirstReander(true);
        } else {
            setActiveQuestionId(null);
        }
    };

    const updateForm = (data: Partial<TForm["welcomeCard"]>) => {
        setLocalForm({
            ...localForm,
            welcomeCard: {
               ...localForm.welcomeCard,
               ...data,
            },
        })
    };
    

    return (
        <div className={cn(
            open ? "scale-100 shadow-lg" : "scale-97 shadow-md",
            "group flex flex-row rounded-lg bg-white transition-translocalForm duration-300 ease-in-out"
        )}>
            <div className={cn(
                open ? "bg-slate-50" : "",
                "flex w-10 items-center justify-center rounded-l-lg border-b border-l border-t group-aria-expanded:rounded-bl-none",
                isInvalid ? "bg-red-400" : "bg-white group-hover:bg-slate-50"
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
                            <div>
                                <p className="text-sm font-semibold">Welcome Card</p>
                                {!open && (
                                    <p className="mt-1 truncate text-xs text-slate-500">
                                        {localForm?.welcomeCard?.enabled ? "Shown": "Hidden"}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Label htmlFor="welcome-toggle">{localForm?.welcomeCard?.enabled  ? "On" : "Off"}</Label>

                            <Switch
                                id="welcome-toggle"
                                checked={localForm?.welcomeCard?.enabled}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateForm({ enabled: !localForm.welcomeCard?.enabled });
                                }}
                            />
                        </div>
                    </div>
                </Collapsible.CollapsibleTrigger>
                
                <Collapsible.CollapsibleContent className="px-4 pb-6">
                    <form>
                        <div className="mt-2">
                            <Label htmlFor="companyLogo">Company Logo</Label>
                        </div>
                        {/* <div className="mt-3 flex w-full items-center justify-center">
                            <FileInput
                                id="welcome-card-image"
                                allowedFileExtensions={["png", "jpeg", "jpg"]}
                                fileUrls={localForm?.welcomeCard?.fileUrl ? [localForm.welcomeCard.fileUrl] : []}
                            />
                        </div> */}
                        <div className="mt-3">
                            <QuestionFormInput
                                id="headline"
                                value={localForm.welcomeCard.headline}
                                label="Note*"
                                localForm={localForm}
                                questionIdx={-1}
                                isInvalid={true}
                                updateForm={updateForm}
                            />
                        </div>
                        {/* <div className=""> */}
                            {/* <Label>Welcome Message</Label> */}
                            {/* <div className=""> */}
                                {/* LocalizedEditor */}
                                
                            {/* </div> */}
                        {/* </div> */}
                        <div className="">
                            <div className="">
                                <div className="">
                                    {/* QuestionlocalFormInput */}
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-6 flex  items-center">
                            <div className="mr-2">
                                <Switch 
                                    id="showResponseCount"
                                    name="showResponseCount"
                                    checked={localForm.welcomeCard.showResponseCount}
                                    onCheckedChange={() => {}}
                                    />
                            </div>
                            <div className="flex-column">
                                <Label>Show Response Count</Label>
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                    Display number of responses for survey
                                </div>
                            </div>
                        </div> */}
                    </form>
                </Collapsible.CollapsibleContent>
            </Collapsible.Root>
        </div>
    )
}