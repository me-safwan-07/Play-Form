import { FormInlineProps } from "@/types/playform";
import { useCallback, useEffect, useMemo } from "react";

const createContainerId = () => `playform-form-container`;
declare global {
    interface Window {
        playforms: {
            renderFormInline: (props: FormInlineProps) => void;
            // renderFormModal: (props: FormModalProps) => void;
        };
    }
}

export const FormInline = (props: Omit<FormInlineProps, "containerId">) => {
    const containerId = useMemo(() => createContainerId(), []);
    const renderInline = useCallback(
        () => window.playforms.renderFormInline({ ...props, containerId}),
        [containerId, props]
    );

    useEffect(() => {
        const loadScript = async () => {
            if (!window.playforms) {
                try {
                    // await loadFormScript();
                    renderInline();  
                } catch (error) {
                    console.error("Failed to load the forms package: ", error);
                }
            } else {
                renderInline();
            }
        };
        loadScript();
    }, [containerId, props, renderInline]);

    return <div id={containerId} className="h-full w-full" />;
}