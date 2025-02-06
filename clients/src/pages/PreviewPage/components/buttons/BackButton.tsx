interface BackButtonProps {
    onClick: () => void;
    tabIndex: number;
}

export const BackButton = ({ onClick, tabIndex }: BackButtonProps) => {
    return (
        <button
            dir="auto"
            type="button"
            onClick={onClick}
            tabIndex={tabIndex}
            className="text-slate-900 focus:text-slate-500 rounded-lg flex items-center border border-transparent px-3 py-3 text-base font-medium shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
            Back
        </button>
    );
};
