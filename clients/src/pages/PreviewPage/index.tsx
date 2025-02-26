import { Variants, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { TForm } from "@/types/forms";
import { TabOption } from "@/components/ui/TabOption";
import { ExpandIcon, MonitorIcon, ShrinkIcon, SmartphoneIcon } from "lucide-react";
import { ResetProgressButton } from "@/components/ui/ResetProgressButton";
import { MediaBackground } from "@/components/ui/MediaBackground";
import Form from "./components/general/Form";

interface FormPreviewProps {
    form: TForm,
    questionId?: string | null,
}

let formNametemp: string;

const previewParentContainerVariant: Variants = {
    expanded: {
      position: "fixed",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(15px)",
      left: 0,
      top: 0,
      zIndex: 1040,
      transition: {
        ease: "easeIn",
        duration: 0.001,
      },
    },
    shrink: {
      display: "none",
      position: "fixed",
      backgroundColor: "rgba(0, 0, 0, 0.0)",
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0,
      },
      zIndex: -1,
    },
  };

let setQuestionId = (_: string) => {};

export const FormPreview = ({ 
    form,  
    questionId
}: FormPreviewProps) => {
    const [isFullScreenPreview, setIsFullScreenPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState("mobile");
    const [previewPosition, setPreviewPosition] = useState("relative");
    const ContentRef = useRef<HTMLDivElement | null>(null);
    const [shrink, setShrink] = useState(false);

    const previewScreenVariants: Variants = {
        expanded: {
          right: "5%",
          bottom: "10%",
          top: "12%",
          width: "40%",
          position: "fixed",
          height: "80%",
          zIndex: 1050,
          boxShadow: "0px 4px 5px 4px rgba(169, 169, 169, 0.25)",
          transition: {
            ease: "easeInOut",
            duration: shrink ? 0.3 : 0,
        },
        },
        expanded_with_fixed_positioning: {
          zIndex: 1050,
          position: "fixed",
          top: "5%",
          right: "5%",
          bottom: "10%",
          width: "90%",
          height: "90%",
          transition: {
            ease: "easeOut",
            duration: 0.4,
          },
        },
        shrink: {
          display: "relative",
          width: ["83.33%"],
          height: ["95%"],
        },
      };

    const updateQuestionId = useCallback(
        (newQuestionId: string) => {
            if (!newQuestionId || newQuestionId === "hidden") return
            if (newQuestionId === "start" && !form.welcomeCard.enabled) return;
            setQuestionId(newQuestionId);
        },
        [form.welcomeCard.enabled]
    );

    useEffect(() => {
        if (questionId) {
            updateQuestionId(questionId)
        }
    }, [questionId, updateQuestionId]);

    // this useEffect is for refreshing the form preview only if user is switching between templates on form templates page and hence we are checking for form.id === "someUniqueId" which is a common Id for all templates
    useEffect(() => {
        if (form.name !== formNametemp && form.id === "someUniqueId1") {
            resetQuestionProgress();
            formNametemp = form.name;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]) 

    const resetQuestionProgress = () => {
        const storePreviewMode = previewMode;
        setPreviewMode("null");
        setTimeout(() => {
            setPreviewMode(storePreviewMode);
        }, 10);

        setQuestionId(form.welcomeCard.enabled ? "start": form?.questions[0]?.id);
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-items-center" id="form-preview">
            <motion.div 
                variants={previewParentContainerVariant}
                className="fixed hidden h-[95%] w-5/6"
                animate={isFullScreenPreview ? "expanded" : "shrink"}
            />
            <motion.div 
                layout
                variants={previewScreenVariants}
                animate={
                    isFullScreenPreview 
                        ? previewPosition === 'relative'
                            ? "expanded"
                            : "expanded_with_fixed_positioning"
                        : 'shrink'
                }
                className="relative flex h-[95%] max-h-[95%] w-5/6 items-center justify-center rounded-lg border border-slate-200 bg-slate-200" 
            >
                {previewMode === "mobile" && (
                    <>
                        <p className="absolute left-0 top-0 m-2 rounded bg-slate-100 px-2 py-1 text-xs text-slate-400">
                            Preview
                        </p>
                        <div className="absolute right-0 top-0 m-2">
                            <ResetProgressButton onClick={() => resetQuestionProgress()} />
                        </div>    
                        <MediaBackground isMobilePreview ContentRef={ContentRef}>
                            <div className="flex h-full w-full flex-col justify-center item-center ">
                                <div className="z-10 w-full max-w-md rounded-lg border border-transparent">
                                    <Form 
                                        form={form}
                                        isRedirectDisabled={true}
                                        getSetQuestionId={(f: (value: string) => void) => {
                                            setQuestionId = f;
                                        }}
                                        questionId={questionId}
                                    />
                                </div>
                            </div>
                        </MediaBackground>                 
                    </>
                )}
                {previewMode === "desktop" && (
                    <div className="flex h-full w-5/6 flex-1 flex-col">
                        <div className="flex h-8 w-full items-center rounded-t-lg bg-slate-100">
                            <div className="ml-6 flex space-x-2">
                                <div className="h-3 w-3 rounded-full bg-red-300"></div>
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="ml-4 flex w-full justify-between font-mono text-sm text-slate-400">
                                <p>Preview</p>

                                <div className="flex items-center">
                                    {isFullScreenPreview ? (
                                        <ShrinkIcon 
                                            className="mr-2 h-4 w-4 cursor-pointer"
                                            onClick={() => {
                                                setShrink(true);
                                                setPreviewPosition("relative");
                                                setTimeout(() => setIsFullScreenPreview(false), 300);
                                            }}
                                        />
                                    ): (
                                        <ExpandIcon 
                                            className="mr-2 h-4 w-4 cursor-pointer"
                                            onClick={() => {
                                                setShrink(false);
                                                setIsFullScreenPreview(true);
                                                setTimeout(() => setPreviewPosition('fixed'), 300);
                                            }}
                                        />
                                    )}
                                    <ResetProgressButton onClick={() => resetQuestionProgress()} />
                                </div>
                            </div>           
                        </div>
                        <MediaBackground 
                            // form={form}
                            // questionId={questionId}
                            ContentRef={ContentRef}
                            isEditorView
                        >
                            <div className="z-0 w-full max-w-md rounded-lg border-transparent">
                                <Form 
                                    form={form}
                                    isRedirectDisabled={true}
                                    questionId={questionId}
                                    getSetQuestionId={(f: (value: string) => void) => {
                                        setQuestionId = f;
                                    }}                                
                                />
                            </div>
                        </MediaBackground>
                    </div>
                )}
            </motion.div>

            <div className="mt-2 flex rounded-full border-2 border-slate-300 p-1">
                <TabOption 
                    active={previewMode === "mobile"} 
                    icon={<SmartphoneIcon className="mx-4 my-2 h-4 w-4 text-slate-700"/>} 
                    onClick={() => setPreviewMode("mobile")} 
                />
                <TabOption 
                    active={previewMode === "desktop"} 
                    icon={<MonitorIcon className="mx-4 my-2 h-4 w-4 text-slate-700"/>} 
                    onClick={() => setPreviewMode("desktop")} 
                />
            </div>
        </div>
    )
}