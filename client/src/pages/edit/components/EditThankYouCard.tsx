import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { QuestionFormInput } from "@/components/ui/QuestionFormInput"
import { Switch } from "@/components/ui/Switch"
import { cn } from "@/lib/utils"
import * as Collapsible from "@radix-ui/react-collapsible"

export const EditThankYouCard = () => {
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
                        />
                        
                        <QuestionFormInput 
                            id="subheader"
                            label="Description"
                            isInvalid={false}
                        />

                        <div className="">
                            <div className="flex items-center space-x-1">
                                <Switch 
                                    id="showButton"
                                />
                                <Label htmlFor="showButton" className="cursor-pointer">
                                    <div className="ml-2">
                                    <h3 className="text-sm font-semibold text-slate-700">Show Button</h3>
                                        <p className="text-xs font-normal text-slate-500">
                                            Send your respondents to a page of your choice
                                        </p>
                                    </div>
                                </Label>
                            </div>
                            <div className="border-1 mt-4 space-y-4 rounded-md border bg-slate-100 p-4 pt-2">
                                <div className="space-y-2">
                                    <QuestionFormInput 
                                        id="buttonLabel"
                                        label="Button Label"
                                        isInvalid={false}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Button Link</Label>
                                    <Input 
                                        id="buttonLink"
                                        name="buttonLink"
                                        className="bg-white"
                                        placeholder="https://playerforms.com/signup"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Collapsible.CollapsibleContent>
            </Collapsible.Root>
        </div>
    )
}