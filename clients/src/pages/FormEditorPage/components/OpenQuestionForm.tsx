import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { QuestionFormInput } from "@/components/ui/QuestionFormInput";
import { OptionsSwitcher } from "@/components/ui/QuestionTypeSelector";
import { TForm, TFormOpenTextQuestion, TFormOpenTextQuestionInputType, TFormQuestion } from "@/types/forms";
import { update } from "lodash";
import { HashIcon, LinkIcon, MailIcon, MessageSquareTextIcon, PhoneIcon, PlusIcon } from "lucide-react";

const questionTypes = [
  { value: "text", label: "Text", icon: <MessageSquareTextIcon className="h-4 w-4" /> },
  { value: "email", label: "Email", icon: <MailIcon className="h-4 w-4" /> },
  { value: "url", label: "URL", icon: <LinkIcon className="h-4 w-4" /> },
  { value: "number", label: "Number", icon: <HashIcon className="h-4 w-4" /> },
  { value: "phone", label: "Phone", icon: <PhoneIcon className="h-4 w-4" /> },
];

interface OpenQuestionFormProps {
    localForm: TForm;
    question: TFormOpenTextQuestion;
    questionIdx: number;
    updateQuestion: (questionIdx: number, updatedAttributes: Partial<TFormOpenTextQuestion>) => void;
    lastQuestion: boolean;
    isInvalid: string[] | null;
}
export const OpenQuestionForm = ({
    question,
    questionIdx,
    updateQuestion,
    isInvalid,
    localForm,
    lastQuestion,
}: OpenQuestionFormProps) => {
    const defaultPlaceholder = getPlaceholderByInputType(question.inputType ?? "text");
    
    const handleInputChange = (inputType: TFormOpenTextQuestionInputType) => {
        const updatedAttributes = {
            inputType,
            placeholder: getPlaceholderByInputType(inputType),
            longAnswer: inputType === 'text' ? question.longAnswer : false,
        };
        updateQuestion(questionIdx, updatedAttributes);
    };

    return (
        <form>
            <QuestionFormInput 
                id="headline"
                value={question.headline}
                localForm={localForm}
                questionIdx={questionIdx}
                // isInvalid={isInvalid}
                updateQuestion={updateQuestion}
                label={"Question*"}
            />

            <div>
                {question.subheader !== undefined && (
                    <div className="inline-flex w-full items-center">
                        <div className="w-full">
                            <QuestionFormInput 
                                id="subheader"
                                label={"Description"}
                                isInvalid={isInvalid}
                                value={question.subheader}
                                localForm={localForm}
                                questionIdx={questionIdx}
                                updateQuestion={updateQuestion}
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
                        onClick={() => {
                            updateQuestion(questionIdx, {
                                subheader: "",
                            });
                        }}

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
                    isInvalid={isInvalid}
                    label={"Placeholder"}
                    value={question.placeholder}
                    localForm={localForm}
                    questionIdx={questionIdx}
                    updateQuestion={updateQuestion}
                />
            </div>

            <div className="mt-3">
                <Label htmlFor="questionType">Input Type</Label>
                <div className="">
                    <OptionsSwitcher 
                        options={questionTypes}
                        currentOption={question.inputType}
                        handleTypeChange={handleInputChange}
                    />
                </div>
            </div>
        </form>
    );
};

const getPlaceholderByInputType = (inputType: TFormOpenTextQuestionInputType) => {
    switch (inputType) {
        case "email":
        return "example@email.com";
        case "url":
        return "http://...";
        case "number":
        return "42";
        case "phone":
        return "+1 123 456 789";
        default:
        return "Type your answer here...";
    }
};
