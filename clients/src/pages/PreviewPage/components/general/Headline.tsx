interface HeadlineProps {
    headline?: string;
    questionId: string;
    required?: boolean;
    alignTextCenter?: boolean;
  }
  
  export const Headline = ({
    headline,
    questionId,
    required = true,
    alignTextCenter = false,
  }: HeadlineProps) => {
    return (
      <label
        htmlFor={questionId}
        className="text-slate-900 mb-1.5 block text-base font-semibold leading-6">
        <div
          className={`flex items-center ${alignTextCenter ? "justify-center" : "justify-between"}`}
          dir="auto">
          {headline}
          {required === false && (
            <span
              className="text-slate-900 mx-2 self-start text-sm font-normal leading-7 opacity-60"
              tabIndex={-1}>
              Optional
            </span>
          )}
        </div>
      </label>
    );
  };
  