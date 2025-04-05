import { AlertDialog } from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button/"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { TForm, TFormEditorTabs } from "@/types/forms";
import axios from "axios";
import { isEqual } from "lodash";
import { AlertTriangleIcon, ArrowLeftIcon } from "lucide-react"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


interface FormMenuBarProps {
    form: TForm;
    localForm: TForm;
    setLocalForm: (localForm: TForm) => void;
    activeId: TFormEditorTabs;
    setActiveId: React.Dispatch<React.SetStateAction<TFormEditorTabs>>;
    environmentId: string;
    responseCount: number;
    // setInvalidQuestions: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export const FormMenuBar = ({
    form,
    localForm,
    setLocalForm,
    activeId,
    environmentId,
    responseCount,
    // setInvalidQuestions,
}: FormMenuBarProps) => {
    const navigate = useNavigate();
    const [audiencePrompt, setAudiencePrompt] = useState(true);
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [isFormPublishing, setIsFormPublishing] = useState(false);
    const [isFormSaving, setIsFormSaving] = useState(false);
    const cautionText = "This form received responses.";
    
    // const faultyQuestions: string[] = [];

    useEffect(() => {
        if (audiencePrompt && activeId === 'settings') {
            setAudiencePrompt(false);
        } 
    }, [activeId, audiencePrompt]);

    useEffect(() => {
        const warningText = "You have unsaved changes - are you sure you wish to leave this page?";
        const handleWindowClose = (e: BeforeUnloadEvent) => {
            if (!isEqual(localForm, form)) {
                e.preventDefault();
                return  (e.returnValue = warningText);
            }
        }
        window.addEventListener('beforeunload', handleWindowClose);
        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        }
    }, [localForm, form]);
    
    const handleBack = () => {
        const { updatedAt, ...localFormsRest } = localForm;
        const { updatedAt: _, ...formRest } = form;

        if(!isEqual(localFormsRest, formRest)) {
            setConfirmDialogOpen(true);
        } else {
            navigate(-1);
        };
    };

    const handleFormSave = async () => {
        setIsFormSaving(true);
        try {
            // Clean up questions by removing draft status
            const cleanedQuestions = localForm.questions.map((question) => {
                const { isDraft, ...rest } = question;
                return rest;
            });

            const formToUpdate = {
                ...localForm,
                questions: cleanedQuestions
            };

            const response = await axios.put(
                `http://localhost:3000/api/forms/${form.id}`,
                { updatedForm: formToUpdate },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const updatedForm = response.data.form;
            setLocalForm(updatedForm);
            setIsFormSaving(false);
            toast.success("Changes saved");
        } catch (e) {
            console.error(e);
            setIsFormSaving(false);
            toast.error(`Error saving changes`);
        }
    };
    
    const handleSaveAndGoBack = async () => {
        await handleFormSave();
        navigate(-1);
    }
    const handleSurveyPublish = async () => {
        setIsFormPublishing(true);
        try {
            // Clean up questions by removing draft status
            const cleanedQuestions = localForm.questions.map((question) => {
                const { isDraft, ...rest } = question;
                return rest;
            });

            const formToUpdate = {
                ...localForm,
                questions: cleanedQuestions,
                status: "published"  // Update status to published
            };

            const response = await axios.put(
                `http://localhost:3000/api/forms/${form.id}`,
                { updatedForm: formToUpdate },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const updatedForm = response.data.form;
            setLocalForm(updatedForm);
            setIsFormPublishing(false);
            navigate(`/environments/${environmentId}/forms/${localForm.id}/summary?success=true`);
        } catch (e) {
            console.error(e);
            setIsFormPublishing(false);
            toast.error(`Error publishing form`);
        }
    };
    
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
                    <p className="hidden pl-4 font-semibold md:block">Match Form / </p>
                    <Input 
                        defaultValue={localForm.name}
                        onChange={(e) => {
                            const updatedForm = { ...localForm, name: e.target.value};
                            setLocalForm(updatedForm);
                        }}
                        className="w-72 border-white hover:border-slate-200"
                    />
                </div>
                {responseCount > 0 && (
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
                )}
                <div className="mt-3 flex sm:ml-4 sm:mt-0">
                    <Button
                        disabled={isFormSaving}
                        variant="secondary"
                        className="mr-3"
                        loading={false}
                        onClick={() => handleFormSave()}
                    >
                        Save
                    </Button>
                    {localForm.status !== "draft" && (
                        <Button
                            disabled={false}
                            variant="darkCTA"
                            className="mr-3"
                            loading={false}
                            onClick={() => handleSaveAndGoBack()}
                        >
                            Save & Close
                        </Button>
                    )}
                    
                    {localForm.status == "draft" && (
                        <Button
                            disabled={false}
                            variant="darkCTA"
                            // className="mr-3"
                            loading={isFormPublishing}
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