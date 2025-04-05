// import { TForm } from "@/types/forms";

import { useState } from "react";

interface MediaBackgroundProps {
    children: React.ReactNode;
    // form: TForm;
    isMobilePreview?: boolean;
    isEditorView?: boolean;
    ContentRef?: React.RefObject<HTMLDivElement>;
}

export const MediaBackground: React.FC<MediaBackgroundProps> = ({
    children,
    ContentRef,
    // form,
    isMobilePreview = false,
    isEditorView = false,
}) => {
    // const [backgroundLoaded, setBackgroundLoaded] = useState(false);

    const baseClasses = "absolute inset-0 h-full w-full transition-opacity duration-500";
    // const loadedClass = backgroundLoaded ? "opacity-100" : "opacity-0";
    const loadedClass = "opacity-0";
    
    // const renderBackground = () => {
    //     switch
    // }


    const renderContent = () => (
        <div className="no-scrollbar absolute flex h-full w-full items-center justify-center overflow-hidden">
            {children}
        </div>
    );

    if(isMobilePreview) {
        return (
            <div 
                className="relative h-[90%] max-h-[40rem] w-[22rem] overflow-hidden rounded-[3rem] border-[6px] border-slate-400">
                <div className="absolute left-1/2 right-1/2 top-2 z-20 h-4 w-1/3 -translate-x-1/2 transform rounded-full bg-slate-400"></div>
                <div
                    className={`${baseClasses} ${loadedClass}`}
                    style={{ backgroundColor:"#ffffff" }}
                />
                {renderContent()}
            </div>
        )
    } else if (isEditorView) {
        return (
            <div ref={ContentRef} className="overflow-hiddem flex flex-grow flex-col rounded-b-lg">
                <div className="relative flex w-full flex-grow flex-col items-center justify-center p-4 py-6">
                    <div
                        className={`${baseClasses} ${loadedClass}`}
                        style={{ backgroundColor:"#ffffff" }}
                    />
                    <div className="flex h-full w-full items-center justify-center">{children}</div>
                </div>
            </div> 
        )
    } else {
        return (
            <div className="flex min-h-dvh flex-col items-center justify-center">
                <div
                    className={`${baseClasses} ${loadedClass}`}
                    style={{ backgroundColor:"#ffffff" }}
                />
                <div className="relative w-full">{children}</div>
            </div>
        )
    }
}