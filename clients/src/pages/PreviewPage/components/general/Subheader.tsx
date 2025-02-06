interface SubheaderProps {
    subheader?: string;
    questionId: string;
}

export const Subheader = ({ subheader, questionId }: SubheaderProps) => {
    return (
        <p 
            id={questionId}
            className="text-slate-700 block break-words text-sm font-normal leading-5"
            dir="auto"
        >
            {subheader}
        </p>
    )
}