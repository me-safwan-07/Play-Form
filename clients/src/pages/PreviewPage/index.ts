import { FormInlineProps } from "@/types/playform";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { FormInline } from "./components/general/FormInline";

export const renderFormInline = (props: FormInlineProps) => {
    // addStylesToDom();  // TODO
    // addCustomThemeToDom({ styling: props.styling }); // TODO

    const element = document.getElementById(props.containerId);
    if(!element) {
        throw new Error(`renderForm: Element with id ${props.containerId} not found.`);
    }
    const root = createRoot(element);
    root.render(createElement(FormInline, props));
};

// export const renderFormModal = (props: FormModalProps) => {
//     // addStylesToDom();  // TODO
//     // addCustomThemeToDom({ styling: props.styling }); // TODO

//     // add container element to DOM
//     const element = document.createElement('div');
//     element.id = "playform-modal-container";
//     document.body.appendChild(element);
    
//     const root = createRoot(element);
//     root.render(createElement(, props));
// };

if (typeof window !== "undefined") {
    window.playforms = {
        renderFormInline,
        // renderFormModal
    };
}

