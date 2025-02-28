import { TForm } from "./forms";
import { TResponseData, TResponseUpdate } from "./responses";
import { TUploadFileConfig } from "./storage";

export interface FormBaseProps {
    form: TForm;
    isBrandingEnabled: boolean;
    getSetIsError?: (getSetError: (value: boolean) => void) => void;
    getSetIsResponseSendingFinished?: (getSetIsResponseSendingFinished: (value: boolean) => void) => void;
    getSetQuestionId?: (getSetQuestionId: (value: string) => void) => void;
    onDisplay?: () => void;
    onResponse?: (response: TResponseUpdate) => void;
    onFinished?: () => void;
    onClose?: () => void;
    onRetry?: () => void;
    autoFocus?: boolean;
    isRedirectDisabled?: boolean;
    prefillResponseData?: TResponseData;
    skipPrefilled?: boolean;
    onFileUpload?: (file: File, config?: TUploadFileConfig) => Promise<string>;
    responseCount?: number;
    isCardBorderVisible?: boolean;
    startAtQuestionId?: string;
    clickOutside?: boolean;
    hiddenFieldsRecord?: TResponseData;
    shouldResetQuestionId?: boolean;
    fullSizeCards?: boolean;
}

export interface FormInlineProps extends FormBaseProps {
    containerId: string;
}

export interface FormModalProps extends FormBaseProps {
    clickOutSide: boolean;
    darkOverlay: boolean;
    placement: "bottomLeft" | "bottomRight" | "topLeft" | "topRight" | "center";
}
