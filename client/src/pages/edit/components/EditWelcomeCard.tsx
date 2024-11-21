import * as Collapsible from "@radix-ui/react-collapsible";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FileInput } from "lucide-react";
import { useState } from "react"
import { useLocation } from "react-router-dom";

interface EditWelcomeCardProps {
    // setActiveQuestionId: 
    activeQuestionId: string | null;

}

export const EditWelcomeCard = ({
    activeQuestionId,
}: EditWelcomeCardProps) => {
    const [firstReander, setFirstReander] = useState(true);
    const path = useLocation().pathname;
    const evvironmentId = path?.split("/environments/")[1]?.split('/')[0];

    let open = activeQuestionId == "start";

    // const setOpen = (e) => {
    //     if (e) {
    //         setActiveQuestionId("start");
    //         setFirstReander(true);
    //     }
    // }
    

    return (
        <div className="">
            <div className="">
                <p className="">✋</p>
            </div>
            <Collapsible.Root
                open={open}
                className=""
            >
                <Collapsible.CollapsibleTrigger
                    asChild
                    className=""
                >
                    <div className="">
                        <div className="">
                            <div className="">
                                <p className="Welcome Card"></p>
                                {!open && (
                                    <p className="">Shown</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Collapsible.CollapsibleTrigger>
                
                <Collapsible.CollapsibleContent className="px-4 pb-6">
                    <div className="">
                        <Label>Company Logo</Label>
                    </div>
                    <div className="">
                        <FileInput 
                            id="welcome-card-image"
                        />
                    </div>
                    <div className="">
                        {/* QuestionFormInput */}
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
                        <div className="">
                            <Label>Time to Finish</Label>
                            <div className="">
                                Display an estimate of completion time for survey
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                {/* Switch */}
                            </div>
                            <div className="">
                                <Label>Show Response Count</Label>
                                <div className="">
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