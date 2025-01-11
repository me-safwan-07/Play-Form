import { AlertDialog } from "@/components/ui/AlertDialog";
import Button from "@/components/ui/Button/"
import { Input } from "@/components/ui/Input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { TForm, TFormEditorTabs } from "@/types/forms";
import { isEqual } from "lodash";
import { AlertTriangleIcon, ArrowLeftIcon, SettingsIcon } from "lucide-react"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


interface FormMenuBarProps {
    form: TForm;
    localForm: TForm;
    setLocalForm: (localForm: TForm) => void;
    activeId: TFormEditorTabs;
    setActiveId: React.Dispatch<React.SetStateAction<TFormEditorTabs>>;
}
export const FormMenuBar = ({
    form,
    localForm,
    setLocalForm,
    activeId,
    setActiveId,
}: FormMenuBarProps) => {
    // const product = {
    //     name: "Product one"
    // };
    // const [localForm, setlocalForm] = useState({
    //     name: "first form",
    //     // status: "draft"
    //     status: "draft",
    // });
    const [audiencePrompt, setAudiencePrompt] = useState(true);
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();
    const [isSurveyPublishing, setIsSurveyPublishing] = useState(false);
    const cautionText = "This form received responses.";

    useEffect(() => {
        if (audiencePrompt && activeId === 'settings') {
            setAudiencePrompt(false);
        } 
    }, [activeId, audiencePrompt]);

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
    };

    const handleBack = () => {
        const { updatedAt, ...localFormsRest } = localForm;
        const { updatedAt: _, ...formRest } = form;

        if(!isEqual(localFormsRest, formRest)) {

        } else {
            navigate(-1);
        };
    };


    const handleSaveAndGoBack = async () => {
        navigate(-1);
    }

    return (
        <>
      <div className="border-b border-slate-200 bg-white px-5 py-3 sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center space-x-2 whitespace-nowrap">
                    <Button
                        variant="secondary"
                        StartIcon={ArrowLeftIcon}
                        onClick={() => {
                            handleBack();
                        }}
                    >
                        Back
                    </Button>
                    {/* <p className="hidden pl-4 font-semibold md:block">{product.name} / </p> */}
                    <Input 
                        defaultValue={localForm.name}
                        onChange={(e) => {
                            const updatedForm = { ...localForm, name: e.target.value};
                            setLocalForm(updatedForm);
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
                    {localForm.status !== "draft" && (
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

                    {localForm.status == "draft" && (
                        <Button
                            variant="darkCTA"
                            onClickCapture={() => {
                                setAudiencePrompt(false);
                                setActiveId("settings");
                            }}
                            EndIcon={SettingsIcon}
                        >
                            Continue to Settings
                        </Button>
                    )}
                    
                    {localForm.status == "draft" && (
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
                <AlertDialog 
                    headerText="Confirm Form Changes" 
                    open={isConfirmDialogOpen}
                    setOpen={setConfirmDialogOpen}
                    mainText="You have unsaved changes in your form. would you like to save them before leaving?"
                    confirmBtnLabel="Save"
                    declineBtnLabel="Discard"
                    declineBtnVariant="warn"
                    onDecline={() => {
                        setConfirmDialogOpen(false);
                        navigate(-1);
                    }}
                    onConfirm={() => handleSaveAndGoBack()}
                />
            </div>
        </>
    )
}