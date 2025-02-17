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
      tabIndex={tabIndex}
      autoFocus={focus}
      className="bg-slate-500 border border-transparent text-white focus:ring-slate-500 rounded-lg flex items-center px-3 py-3 text-base font-medium leading-4 shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
      onClick={onClick}
      disabled={disabled}
    >
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
};
