import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { QuestionFormInput } from "@/components/ui/QuestionFormInput";
import { OptionsSwitcher } from "@/components/ui/QuestionTypeSelector";
import { TForm } from "@/types/forms";
import { PlusIcon } from "lucide-react";

const dateOptions = [
  {
    value: "M-d-y",
    label: "MM-DD-YYYY",
  },
  {
    value: "d-M-y",
    label: "DD-MM-YYYY",
  },
  {
    value: "y-M-d",
    label: "YYYY-MM-DD",
  },
];

interface DateQuestionFormProps {
    localForm: TForm;
}
export const DateQuestionForm = ({
    localForm
}: DateQuestionFormProps) => {
    
    return (
        <form>
            <QuestionFormInput 
                id="headline"
                label={"Question*"}
                isInvalid={false}
                value=""
                localForm={localForm}
                questionIdx={0}
            />
            <div>
                <div className="mt-2 inline-flex w-full items-center">
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

                <Button
                    size="sm"
                    className="mt-3"
                    type="button"

                >
                    <PlusIcon className="mr-1 h-4 w-4" />
                    Add Description
                </Button>
            </div>

            <div className="mt-3">
                <Label htmlFor="questionType">Date Format</Label>
                <div className="mt-2 flex items-center">
                    <OptionsSwitcher 
                        options={dateOptions}
                        currentOption="M-d-y"
                    />
                </div>
            </div>
        </form>
    )
} 