import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { QuestionFormInput } from "@/components/ui/QuestionFormInput";
import { OptionsSwitcher } from "@/components/ui/QuestionTypeSelector";
import { TForm, TFormOpenTextQuestion, TFormQuestion } from "@/types/forms";
import { HashIcon, LinkIcon, MailIcon, MessageSquareTextIcon, PhoneIcon, PlusIcon } from "lucide-react";

const questionTypes = [
  { value: "text", label: "Text", icon: <MessageSquareTextIcon className="h-4 w-4" /> },
  { value: "email", label: "Email", icon: <MailIcon className="h-4 w-4" /> },
  { value: "url", label: "URL", icon: <LinkIcon className="h-4 w-4" /> },
  { value: "number", label: "Number", icon: <HashIcon className="h-4 w-4" /> },
  { value: "phone", label: "Phone", icon: <PhoneIcon className="h-4 w-4" /> },
];

interface OpenQuestionFormProps {
    question: TFormOpenTextQuestion;
    localForm: TForm;
    questionIdx: number;
}
export const OpenQuestionForm = ({
    question,
    localForm,
    questionIdx
}: OpenQuestionFormProps) => {
    return (
        <form>
            <QuestionFormInput 
                id="headline"
                value={question.headline}
                localForm={localForm}
                questionIdx={questionIdx}
                isInvalid={true}
                label={"Question*"}
            />

            <div>
                {question.subheader !== undefined && (
                    <div className="inline-flex w-full items-center">
                        <div className="w-full">
                            <QuestionFormInput 
                                id="subheader"
                                label={"Description"}
                                isInvalid={false}
                                value={question.subheader}
                                localForm={localForm}
                                questionIdx={questionIdx}
                            />
                        </div>
                    </div>
                )}

                {question.subheader === undefined && (
                    <Button
                        size="sm"
                        variant="minimal"
                        className="mt-3"
                        type="button" 

                    >
                        <PlusIcon className="mr-1 h-4 w-4"/>
                        Add Description
                    </Button>
                )}

                {/* add the toggle button for add description */}
            </div>
            <div className="mt-2">
                <QuestionFormInput 
                    id="placeholder"
                    isInvalid={false}
                    label={"Placeholder"}
                    value={question.placeholder}
                    localForm={localForm}
                    questionIdx={questionIdx}
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


