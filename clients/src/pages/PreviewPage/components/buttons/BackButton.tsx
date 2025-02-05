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
            className="border border-gray-300 text-gray-900 focus:ring-gray-500 rounded-lg flex items-center px-3 py-3 text-base font-medium leading-4 shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
            Previous
        </button>
    )
}