import { loadFormScript, useFormScript } from "@/lib/loadScript";
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
    const { loading, error } = useFormScript();
    const containerId = useMemo(() => createContainerId(), []);
    const renderInline = useCallback(
        () => window.playforms.renderFormInline({ ...props, containerId}),
        [containerId, props]
    );

    useEffect(() => {
        // const loadScript = async () => {
        //     if (!window.playforms) {
        //         try {
        //             await loadFormScript();
        //             renderInline();  
        //         } catch (error) {
        //             console.error("Failed to load the forms package: ", error);
        //         }
        //     } else {
        //         renderInline();
        //     }
        // };
        // loadScript();

        if (!loading && !error) {
            renderInline();
        }
    // }, [containerId, props, renderInline]);
    }, [loading, error, renderInline]);

    if (loading) return <p>Loading survey...</p>;
    if (error) return <p>{error}</p>;
    
    return <div id={containerId} className="h-full w-full" />;
}