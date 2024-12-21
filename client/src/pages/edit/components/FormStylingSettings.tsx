import Button from "@/components/ui/Button/index";
import * as Collapsible from "@radix-ui/react-collapsible";
import { CheckIcon, SparklesIcon } from "lucide-react";

export const FormStylingSettings = () => {
    return (
        <Collapsible.Root
            open={true}
            className="w-full rounded-lg border border-slate-300 bg-white"
        >
            <Collapsible.CollapsibleTrigger
                asChild
                className="w-full cursor-pointer rounded-lg hover:bg-slate-50"
            >
                <div className="">
                    <div className="">
                        <CheckIcon 
                            strokeWidth={3}
                            className="h-7 w-7 rounded-full border border-green-300 bg-gren-100 p-1.5 text-green-600"
                        />
                    </div>

                    <div>
                        <p className="">
                            Form Styling
                        </p>
                        <p className="">
                            Style the question texts, description and input fields.
                        </p>
                    </div>
                </div>
            </Collapsible.CollapsibleTrigger>

            <Collapsible.CollapsibleContent>
                <hr className="py-1 text-slate-600"/>

                <div className="">
                    <div className="">
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            EndIcon={SparklesIcon}
                            className="w-fit"
                        >
                            Suggest colors
                        </Button>
                    </div>
                </div>
            </Collapsible.CollapsibleContent>
        </Collapsible.Root>
    )
}