import { QuestionFormInput } from "@/components/ui/QuestionFormInput"
import { TForm } from "@/types/forms";
import { GripVerticalIcon, PlusIcon, TrashIcon } from "lucide-react"

interface SelectQuestionChoiceProps {
    localForm: TForm;
}
export const SelectQuestionChoice = ({
    localForm,
}: SelectQuestionChoiceProps) => {
    return (
        <div className="flex w-full gap-2">
            <div className="mt-6 ">
                <GripVerticalIcon className="h-4 w-4 cursor-move text-slate-400"/>
            </div>

            <div className="flex w-full space-x-2">
                <QuestionFormInput 
                    id="choice"
                    placeholder="other"
                    isInvalid={false}
                    label={""}
                    className="mt-0"
                    value=""
                    localForm={localForm}
                    questionIdx={0}
                />
            </div>
            <div className="mt-6 flex gap-2">
                <TrashIcon 
                    className="h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-500"
                />
                <div className="h-4 w-4">
                    <PlusIcon 
                        className="h-full w-full cursor-pointer text-slate-400 hover:text-slate-500"
                    />
                </div>
            </div>
        </div>
    )
}