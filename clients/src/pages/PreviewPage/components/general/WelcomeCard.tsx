import { TForm } from "@/types/forms";
import { useEffect } from "react";
import { ScrollableContainer } from "../wrappers/ScrollableContainer";
import { Headline } from "./Headline";
import { SubmitButton } from "../buttons/SubmitButton";

interface WelcomeCardProps {
    headline?: string;
    // onSubmit: () => void;
    form: TForm;
    isCurrent: boolean;
}

export const WelcomeCard = ({
    headline,
    // onSubmit,
    form,
    isCurrent,
}: WelcomeCardProps) => {
    // const handleSubmit = () => {
    //     onSubmit();
    // }

    // useEffect(() => {
    //     const handleEnter = (e: KeyboardEvent) => {
    //         if (e.key === "Enter") {
    //             handleSubmit();
    //         }
    //     };
    //     if (isCurrent) {
    //         document.addEventListener("keydown", handleEnter);
    //     } else {
    //         document.removeEventListener("keydown", handleEnter);
    //     }

    //     return () => {
    //         document.removeEventListener("keydown", handleEnter);
    //     };

    // }, [isCurrent]);

    return (
        <div>
            <ScrollableContainer>
                <Headline 
                    headline={headline}
                    questionId="welcomeCard"
                />
            </ScrollableContainer>

            <div className="fb-flex fb-flex-col fb-gap-2 fb-mt-4">
               <SubmitButton
                    buttonLabel="Start"
                    isLastQuestion={false}
                    focus={true}
                    onClick={handleSubmit}
               />
            </div>
        </div>
    )
}