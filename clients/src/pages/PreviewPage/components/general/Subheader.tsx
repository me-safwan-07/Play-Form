interface SubheaderProps {
    subheader?: string;
    questionId: string;
}

export const Subheader = ({ subheader, questionId }: SubheaderProps) => {
    return (
        <p 
            id={questionId}
            className="fb-text-subheading fb-text-gray-500 fb-text-sm fb-font-medium fb-mb-2 fb-mt-4 fb-ml-6"
            dir="auto"
        >
            {subheader}
        </p>
    )
}