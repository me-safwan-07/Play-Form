import { AdvancedOptionToggle } from "@/components/ui/AdvancedOptionToggle"
import { Button } from "@/components/ui/button"
import { QuestionFormInput } from "@/components/ui/QuestionFormInput"
import { TForm } from "@/types/forms"
import { PlusIcon } from "lucide-react"

interface AddressQuestionFormProps {
    localForm: TForm,
}
export const AddressQuestionForm = ({
    localForm,
}: AddressQuestionFormProps) => {

    return (
        <form>
            <QuestionFormInput 
                id="headline"
                label="Question*"
                isInvalid={false}
                value=""
                localForm={localForm}
                questionIdx={0}
            />

            <div>
                <div className="inline-flex w-full items-center">
                    <div className="w-full">
                        <QuestionFormInput 
                            id="subheader"
                            label={'Description'}
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

                <div className="">Settings</div>
                <AdvancedOptionToggle 
                    isChecked={true}
                    htmlId="isAddressRequired"
                    title="Required: Address Line 1"
                    description=""
                    childBorder
                    customContainerClass="p-0 mt-4"></AdvancedOptionToggle>

                <AdvancedOptionToggle 
                    isChecked={true}
                    htmlId="isAddressLine2Required"
                    title="Required: Address Line 2"
                    description=""
                    childBorder
                    customContainerClass="p-0 mt-4"></AdvancedOptionToggle>
                <AdvancedOptionToggle 
                    isChecked={true}
                    htmlId="isStateRequired"
                    title="Required: State / Region"
                    description=""
                    childBorder
                    customContainerClass="p-0 mt-4"></AdvancedOptionToggle>
                <AdvancedOptionToggle 
                    isChecked={true}
                    htmlId="isZipRequired"
                    title="Required: ZIP / Post Code"
                    description=""
                    childBorder
                    customContainerClass="p-0 mt-4"></AdvancedOptionToggle>
                <AdvancedOptionToggle 
                    isChecked={true}
                    htmlId="iscountryRequired"
                    title="Required: Country"
                    description=""
                    childBorder
                    customContainerClass="p-0 mt-4"></AdvancedOptionToggle>
            </div>
        </form>
    )
}