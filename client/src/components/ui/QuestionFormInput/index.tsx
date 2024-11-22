import { Label } from "@radix-ui/react-dropdown-menu"

interface QuestionFormInputProps {
    label: string;
    isInvalid: boolean;
    maxLength?: number;
    placeholder?: string;
    className?: string;
}

export const QuestionFormInput = ({
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
                    <Label>{label}</Label>
                </div>

                <div className="">
                    
                </div>
            </div>
        </div>
    )
}