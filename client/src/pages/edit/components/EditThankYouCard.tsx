import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { QuestionFormInput } from "@/components/ui/QuestionFormInput"
import { Switch } from "@/components/ui/Switch"
import { cn } from "@/lib/utils"
import { TForm } from "@/types/forms"
import * as Collapsible from "@radix-ui/react-collapsible"

interface EditThankYouCardProps {
    localForm: TForm;
}
export const EditThankYouCard = ({
    localForm,
}: EditThankYouCardProps) => {
    return (
        <div className={cn(
            "scale-100 shadow-lg group z-20 flex flex-row rounded bg-white transition-transform duration-300 ease-in-out"
        )}>
            <div className={cn(
                "bg-slate-50 flex w-10 items-center justify-center rounded-l-lg border-b border-l border-t group-aria-expanded:rounded-bl-none"
            )}>
                <p>🙏</p>
            </div>
            <Collapsible.Root
                className="flex-1 rounded-r-lg border border-slate-200 transition-all duration-300 ease-in-out"
            >
                <Collapsible.CollapsibleTrigger
                    asChild
                    className="flex cursor-pointer justify-between p-4 hover:bg-slate-50"
                >
                    <div className="">
                        <div className="inline-flex">
                            <div className="">
                                <p className="text-sm font-semibold">Thank you card</p>
                            </div>
                        </div>
                    </div>
                </Collapsible.CollapsibleTrigger>
                <Collapsible.CollapsibleContent className="px-4 pb-6">
                    <form>
                        <QuestionFormInput 
                            id="headline"
                            label="Note*"
                            isInvalid={true}
                            value=""
                            localForm={localForm}
                            questionIdx={0}
                        />
                        
                        <QuestionFormInput 
                            id="subheader"
                            label="Description"
                            isInvalid={false}
                            value=""
                            localForm={localForm}
                            questionIdx={1}
                        />
                    </form>
                </Collapsible.CollapsibleContent>
            </Collapsible.Root>
        </div>
    )
}