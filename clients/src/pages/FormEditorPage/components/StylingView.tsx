// import { FormControl, FormField, FormItem } from "@/components/ui/FormStyle"
// import { Switch } from "@/components/ui/Switch"
import { FormStylingSettings } from "./FormStylingSettings"
// import { FormProvider } from "react-hook-form"

export const StylingView = () => {
    return (
        // <FormProvider></FormProvider>
        <form>
            <div className="mt-12 space-y-3 p-5">
                {/* <div className="">
                    <FormField
                        name="overwriteThemeStyling"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Switch checked={!!field.value}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div> */}

                <FormStylingSettings />
            </div>
        </form>
    )
}