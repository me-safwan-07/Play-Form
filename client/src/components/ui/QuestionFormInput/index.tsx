// import { Label } from "@radix-ui/react-dropdown-menu"

import { FileInput } from "../FileInput";
import { Label } from "../Label";

interface QuestionFormInputProps {
    id: string;
    label: string;
    isInvalid: boolean;
    maxLength?: number;
    placeholder?: string;
    className?: string;
}

export const QuestionFormInput = ({
    id,
    label,
    isInvalid,
    maxLength,
    placeholder,
    className,
 }: QuestionFormInputProps
) => {

    return (
        <div className="">
            <div className="">
                <div className="">
                    {/* <Label>{label}</Label> */}
                    <Label htmlFor={id}>{label}</Label>
                </div>

                <div className="">
                    {id === "headline" && (
                        <FileInput 
                            // id="question-image"

                        />
                    )}
                    <div className="">
                        <div className="">
                            <div className="">
                                <div className="">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}