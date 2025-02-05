import { MouseEventHandler, useCallback } from "react";

interface SubmitButtonProps {
  buttonLabel?: string;
  isLastQuestion: boolean;
  focus?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  tabIndex?: number;
}

export const SubmitButton = ({
  buttonLabel,
  isLastQuestion,
  tabIndex = 1,
  focus = false,
  onClick,
  disabled,
  type,
  ...props
}: SubmitButtonProps) => {
  const buttonRef = useCallback(
    (currentButton: HTMLButtonElement | null) => {
      if (currentButton && focus) {
        setTimeout(() => {
          currentButton.focus();
        }, 200);
      }
    },
    [focus]
  );

  return (
    <button
      {...props}
      dir="auto"
      ref={buttonRef}
      type={type}
      autoFocus={focus}
      className="bg-brand border border-submit-button-border text-on-brand focus:ring-focus rounded-custom flex items-center px-3 py-3 text-base font-medium leading-4 shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
      onClick={onClick}
      disabled={disabled}
    >
      {buttonLabel || (isLastQuestion ? "Finish" : "Next")}
    </button>
  );
};
