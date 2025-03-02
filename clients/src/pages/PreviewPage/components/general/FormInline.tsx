import { TForm } from "@/types/forms";
import Form from "./Form"

interface FormInlineProps {
    form: TForm,
    autoFocus?: boolean;
    onDisplay?: () => void;
    getSetIsError?: (getSetError: (value: boolean) => void) => void;
    getSetIsResponseSendingFinished?: (getSetIsResponseSendingFinished: (value: boolean) => void) => void;
    getSetQuestionId?: string | null,
}
export const FormInline = (props: FormInlineProps) => {
    return (
        <div 
            id="fbjs"
            className=""
            style={{
                height: "100%",
                width: "100%",
            }}    
        >
            <Form {...props}/>
        </div>
    );
};