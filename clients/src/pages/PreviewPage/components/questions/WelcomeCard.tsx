import { TForm } from "@/types/forms";
import { TResponseData } from "@/types/responses";
import { ScrollableContainer } from "../wrappers/ScrollableContainer";
import { Headline } from "../general/Headline";

interface WelcomeCardProps {
    headline?: string;
    onSubmit: (data: TResponseData) => void;
    form: TForm;
    isCurrent: boolean;
}

export const WelcomeCard = ({
    headline,
    // onSubmit,
    // form,
    // isCurrent
}: WelcomeCardProps) => {
    return (
        <div className="">
            <ScrollableContainer>
                <div>
                    <Headline 
                        headline={headline}
                        questionId="welcomeCard"
                    />
                </div>
            </ScrollableContainer>
        </div>
    )
}