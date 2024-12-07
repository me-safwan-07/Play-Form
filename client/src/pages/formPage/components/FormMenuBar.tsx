import Button from "@/components/ui/Button/"
import { Input } from "@/components/ui/Input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { AlertTriangleIcon, ArrowLeftIcon } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";


export const FormMenuBar = () => {
    const product = {
        name: "Product one"
    };
    const [localSurvey, setLocalSurvey] = useState({
        name: "first form",
        // status: "draft"
        status: "draft",
    });
    const [isSurveyPublishing, setIsSurveyPublishing] = useState(false);
    const cautionText = "This form received responses.";

    const handleSurveyPublish = async () => {
        setIsSurveyPublishing(true);
        try {
            // await publishSurvey(surveyId);
            setIsSurveyPublishing(false);
            toast.success("Changes saved")
        } catch (e) {
            console.error(e);
            setIsSurveyPublishing(false);
            toast.error(`Error saving changes`);
            return;
        }
    }
    return (
        <>
            <div className="border-b border-slate-200 bg-white px-5 py-3 sm:flex  sm:items-center sm:justify-between">
                <div className="flex items-center space-x-2 whitespace-nowrap">
                    <Button
                        variant="secondary"
                        StartIcon={ArrowLeftIcon}
                        onClick={() => {
                            // Navigate to previous form
                        }}
                    >
                        Back
                    </Button>
                    <p className="hidden pl-4 font-semibold md:block">{product.name} / </p>
                    <Input 
                        defaultValue={localSurvey.name}
                        onChange={(e) => {
                            const updatedForm = { ...localSurvey, name: e.target.value};
                            setLocalSurvey(updatedForm);
                        }}
                        className="w-72 border-white hover:border-slate-200"
                    />
                </div>
                <div className="flex items-center rounded-lg border border-amber-200 p-2 text-amber-700 shadow-sm lg:mx-auto">
                    <TooltipProvider delayDuration={50}>
                        <Tooltip>
                            <TooltipTrigger>
                                <AlertTriangleIcon className="h-5 w-5 text-amber-400"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="py-2 text-center text-xs text-slate-500 dark:text-slate-400">{cautionText}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <p className="hidden pl-1 text-xs md:text-sm lg:block">{cautionText}</p>
                </div>
                <div className="mt-3 flex sm:ml-4 sm:mt-0">
                    <div className="">

                    </div>
                    <Button
                        disabled={false}
                        variant="secondary"
                        className="mr-3"
                        loading={false}
                        onClick={() => {
                            // Save form
                        }}
                    >
                        Save
                    </Button>
                    {localSurvey.status !== "draft" && (
                        <Button
                            disabled={false}
                            variant="darkCTA"
                            className="mr-3"
                            loading={false}
                            onClick={() => {
                                // Publish form
                            }}
                        >
                            Save & Close
                        </Button>
                    )}
                    {localSurvey.status == "draft" && (
                        <Button
                            disabled={false}
                            variant="darkCTA"
                            // className="mr-3"
                            loading={isSurveyPublishing}
                            onClick={handleSurveyPublish}
                        >
                            Publish
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}