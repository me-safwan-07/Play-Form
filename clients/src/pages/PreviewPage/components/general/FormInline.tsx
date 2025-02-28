import { FormInlineProps } from "@/types/playform";
import Form from "./Form";

export const FormInline = (props: FormInlineProps) => {
    return (
        <div
            className="fb-playform-form"
            style={{
                height: "100%",
                width: "100%"
            }}
        >
            <Form {...props} />
        </div>
    )
}