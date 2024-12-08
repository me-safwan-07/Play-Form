import { Variants, motion } from "framer-motion";
import { ResetProgressButton } from "../ResetProgressButton";
import { useState } from "react";
import { ExpandIcon, MonitorIcon, ShrinkIcon, SmartphoneIcon } from "lucide-react";
import { TabOption } from "./components/TabOption";
import { Modal } from "../Modal";
import { Model } from "./components/Model";

type TPreviewType = "modal" | "fullwidth" | "email";

interface PreviewFormProps {
//   surveyId: string;
  previewType?: TPreviewType;
}

export const PreviewForm = ({
    previewType
}: PreviewFormProps) => {
    const [isFullScreenPreview, setIsFullScreenPreview] = useState(true);

    const [previewMode, setPreviewMode] = useState("desktop");
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
            // duration: shrink ? 0.3 : 0,
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

      const resetQuestionProgress = () => {
        // let storePreviewMode = previewMode;
        setPreviewMode("null");
        setTimeout(() => {
            setPreviewMode(previewMode);
            resetQuestionProgress(); // recursively reset progress after 1 second to simulate a loading state
        }, 10);
      }
    return (
        <div className="flex h-full w-full flex-col items-center justify-items-center  ">
            <motion.div 
                variants={previewParentContainerVariant}
                className="fixed hidden h-[95%] w-5/6"
                animate={"expanded"}
            />
            <motion.div
                layout
                variants={previewScreenVariants}
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
                                                setTimeout(() => setIsFullScreenPreview(false), 300);
                                            }}
                                        />
                                    ) : (
                                        <ExpandIcon 
                                            className="mr-2 h-4 w-4 cursor-pointer"
                                            onClick={() => {
                                                setIsFullScreenPreview(true);
                                                // setTimeout(() => setIsFullScreenPreview(
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