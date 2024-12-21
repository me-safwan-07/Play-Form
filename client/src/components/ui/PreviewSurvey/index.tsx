import { Variants, motion } from "framer-motion";
import { ResetProgressButton } from "../ResetProgressButton";
import { useEffect, useState } from "react";
import { ExpandIcon, MonitorIcon, ShrinkIcon, SmartphoneIcon } from "lucide-react";
import { TabOption } from "./components/TabOption";
import { Modal } from "../Modal";
import { Model } from "./components/Model";
import { TForm } from "@/types/forms";
import { MediaBackground } from "../MediaBackground";

type TPreviewType = "modal" | "fullwidth" | "email";

interface PreviewFormProps {
    form: TForm;
    previewType?: TPreviewType;
}

let surveyNameTemp: string;

// const previewParentContainerVariant: Variants = {
//   expanded: {
//     position: "fixed",
//     height: "100%",
//     width: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.4)",
//     backdropFilter: "blur(15px)",
//     left: 0,
//     top: 0,
//     zIndex: 1040,
//     transition: {
//       ease: "easeIn",
//       duration: 0.001,
//     },
//   },
//   shrink: {
//     display: "none",
//     position: "fixed",
//     backgroundColor: "rgba(0, 0, 0, 0.0)",
//     backdropFilter: "blur(0px)",
//     transition: {
//       duration: 0,
//     },
//     zIndex: -1,
//   },
// };

const setQuestionId = () => {};

export const PreviewForm = ({
    form,
    previewType
}: PreviewFormProps) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isFullScreenPreview, setIsFullScreenPreview] = useState(true);

    const [previewMode, setPreviewMode] = useState("desktop");
    const [previewPosition, setPreviewPosition] = useState("relative");
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
        
    // this useEffect is for refreshing the form preview only if user is switching between templates on form templates page and hence we are checking for form.id === "someUniqeId1" which is a common Id for all templates
      useEffect(() => {
        if (form.name !== surveyNameTemp && form.id === "someUniqeId1") {
            resetQuestionProgress();
          surveyNameTemp = form.name;
        }
      }, [form]);

      const resetQuestionProgress = () => {
        const storePreviewMode = previewMode;
        setPreviewMode("null");
        setTimeout(() => {
            setPreviewMode(storePreviewMode);
        }, 10);

        setQuestionId(form.welcomeCard.enabled ? "start" : form.questions[0].id);
      };

      const handlePreviewModalClose = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setQuestionId(form.welcomeCard.enabled ? "start" : form.questions[0].id);
            setIsModalOpen(true);
        }, 1000);
      };


    return (
        <div className="flex h-full w-full flex-col items-center justify-items-center  ">
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
                        : "shrink"
                }
                className="relative flex h-[95%] max-h-[95%] w-5/6 items-center justify-center rounded-lg border border-slate-300 bg-slate-200"

            >
                {previewMode === "mobile" && (
                    <>
                        <p className="absolute left-0 top-0 m-2 rounded bg-slate-100 px-2 py-1 text-xs text-slate-400">
                            Preview
                        </p>
                        <div className="absolute right-0 top-0 m-2">
                            <ResetProgressButton onClick={resetQuestionProgress} />
                        </div>
                        <MediaBackground isMobilePreview>
                          {previewType === "modal" ? (
                              <Modal
                                  isOpen={isModalOpen}
                                  placement="bottomLeft"
                                  
                                  previewMode={previewMode}
                                  handlePreviewModalClose={handlePreviewModalClose}
                              ></Modal>
                          ) : (
                              <div className="">
                                
                              </div>
                          )}
                        </MediaBackground>
                    </>
                )}
                {previewMode === "desktop" && (
                    <div className="flex h-full w-5/6 flex-1 flex-col">
                        <div className="flex h-full items-center rounded-t-lg bg-slate-100">
                            <div className="ml-6 flex space-x-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="ml-4 flex w-full justify-between font-mono text-sm text-slate-400">
                                <p>{previewType === "modal" ? "Your web app" : "Preview"}</p>
                                <div className="flex items-center">

                                    {isFullScreenPreview ? (
                                        <ShrinkIcon 
                                            className="mr-2 h-4 w-4 cursor-pointer"
                                            onClick={() => {
                                                setShrink(true);
                                                setPreviewMode("relative")
                                                setTimeout(() => setIsFullScreenPreview(false), 300);
                                            }}
                                        />
                                    ) : (
                                        <ExpandIcon 
                                            className="mr-2 h-4 w-4 cursor-pointer"
                                            onClick={() => {
                                                setShrink(false);
                                                setIsFullScreenPreview(true);
                                                setTimeout(() => setPreviewPosition("fixed"), 300);

                                            }}
                                        />
                                    )}
                                    <ResetProgressButton onClick={resetQuestionProgress} />
                                </div>
                            </div>
                        </div>

                        {previewType === "modal" && (
                            <Model 
                                previewMode={previewMode}
                            />
                        )}
                    </div>
                )}
            </motion.div>

            <div className="mt-2 flex rounded-full border-2 border-slate-300 p-1">
                <TabOption 
                    active={previewMode === 'mobile'}
                    icon={<SmartphoneIcon className="mx-4 my-2 h-4 w-4 text-slate-700" />}
                    onClick={() => setPreviewMode("mobile")}
                />
                <TabOption 
                    active={previewMode === 'desktop'}
                    icon={<MonitorIcon className="mx-4 my-2 h-4 w-4 text-slate-700" />}
                    onClick={() => setPreviewMode("desktop")}
                />
            </div>
        </div>
    )
}