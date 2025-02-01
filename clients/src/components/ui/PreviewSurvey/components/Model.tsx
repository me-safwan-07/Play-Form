import { cn } from "@/lib/utils"
import { useState } from "react";

interface ModelProps {
    previewMode: string;
} 
export const Model = ({
    previewMode
}: ModelProps) => {
    const [show, setShow] = useState(true);
    const [overlayVisible, setOverlayVisible] = useState(true);

    const overlayStyle = overlayVisible ? "bg-gray-700/80" : "bg-white/50";

    const slidingAnimationClass =
    previewMode === "desktop"
      ? show
        ? "translate-x-0 opacity-100"
        : "translate-x-32 opacity-0"
      : previewMode === "mobile"
        ? show
          ? "bottom-0"
          : "-bottom-full"
        : "";
    return (
        <div
            aria-live="assertive"
            className={cn(
                'relative h-full w-full overflow-hidden rounded-b-md',
                overlayStyle,
                "transition-all duration-500 ease-in-out"
            )}
        >
            <div className={cn(
                "no-scrollbar pointer-events-auto absolute max-h-[90%] w-full max-w-sm transition-all duration-500 ease-in-out",
                previewMode == "desktop" ? "" : "max-w-full",
                slidingAnimationClass
            )}>
                
            </div>
           
        </div>
    )
}