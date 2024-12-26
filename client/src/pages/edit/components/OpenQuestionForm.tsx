import { Label } from "@/components/ui/Label";
import { QuestionFormInput } from "@/components/ui/QuestionFormInput";
import { OptionsSwitcher } from "@/components/ui/QuestionTypeSelector";
import { TForm } from "@/types/forms";
import { HashIcon, LinkIcon, MailIcon, MessageSquareTextIcon, PhoneIcon } from "lucide-react";

const questionTypes = [
  { value: "text", label: "Text", icon: <MessageSquareTextIcon className="h-4 w-4" /> },
  { value: "email", label: "Email", icon: <MailIcon className="h-4 w-4" /> },
  { value: "url", label: "URL", icon: <LinkIcon className="h-4 w-4" /> },
  { value: "number", label: "Number", icon: <HashIcon className="h-4 w-4" /> },
  { value: "phone", label: "Phone", icon: <PhoneIcon className="h-4 w-4" /> },
];

interface OpenQuestionFormProps {
    localForm: TForm;
}
export const OpenQuestionForm = ({
    localForm
}: OpenQuestionFormProps) => {
    return (
        <form action="">
            <QuestionFormInput 
                id="headline"
                isInvalid={true}
                label={"Question*"}
                value=""
                localForm={localForm}
                questionIdx={0}
            />

            <div className="">
                <div className="inline-flex w-full items-center">
                    <div className="w-full">
                        <QuestionFormInput 
                            id="subheader"
                            label={"Description"}
                            isInvalid={false}
                            value=""
                            localForm={localForm}
                            questionIdx={1}
                        />
                    </div>
                </div>

                {/* add the toggle button for add description */}
            </div>
            <div className="mt-2">
                <QuestionFormInput 
                    id="placeholder"
                    isInvalid={false}
                    label={"Placeholder"}
                    value=""
                    localForm={localForm}
                    questionIdx={0}
                />
            </div>

            <div className="mt-3">
                <Label htmlFor="questionType">Input Type</Label>
                <div className="">
                    <OptionsSwitcher 
                        options={questionTypes}
                        currentOption="text"
                    />
                </div>
            </div>
        </form>
    );
};


