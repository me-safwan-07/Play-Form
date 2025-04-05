import { TForm } from "@/types/forms";
import { useEffect } from "react";
import { ScrollableContainer } from "../wrappers/ScrollableContainer";
import { Headline } from "./Headline";
import { SubmitButton } from "../buttons/SubmitButton";
import { TResponseData } from "@/types/responses";
import { HtmlBody } from "./HtmlBody";

interface WelcomeCardProps {
    headline?: string;
    onSubmit: (data: TResponseData) => void;
    form: TForm;
    isCurrent: boolean;
}

export const WelcomeCard = ({
    headline,
    onSubmit,
    // form,
    isCurrent,
}: WelcomeCardProps) => {
    const handleSubmit = () => {
        onSubmit({ ["welcomeCard"]: "clicked" });
    }

    useEffect(() => {
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleSubmit();
            }
        };
    
        if (isCurrent) {
            document.addEventListener("keydown", handleEnter);
        }
        console.log("Rendering WelcomeCard, isCurrent:", isCurrent);

    
        return () => {
            document.removeEventListener("keydown", handleEnter);
        };
    }, [isCurrent]);
    

    return (
        <div>
            <ScrollableContainer>
                <div>
                    <Headline 
                        headline={headline}
                        questionId="welcomeCard"
                    />

                    <HtmlBody 
                        htmlString="welcome to badhriya premium leage gangolli"
                        questionId="welcomeCard"
                    />
                </div>
            </ScrollableContainer>

            <div className="mx-6 mt-4 flex gap-4 py-4">
               <SubmitButton
                    buttonLabel="Start"
                    isLastQuestion={false}
                    // focus={true}
                    onClick={handleSubmit}
                    type="button"
                />
            </div>
        </div>
    )
}