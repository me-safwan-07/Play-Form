// import { TForm } from "@/types/forms";

interface MediaBackgroundProps {
    children: React.ReactNode;
    // form: TForm;
    isMobilePreview?: boolean;
}

export const MediaBackground: React.FC<MediaBackgroundProps> = ({
    children,
    // form,
    isMobilePreview = false,
}) => {
    // const [backgroundLoaded, setBackgroundLoaded] = useState(false);

    // const baseClasses = "absolute inset-0 h-full w-full transition-opacity duration-500";
    // const loadedClass = backgroundLoaded ? "opacity-100" : "opacity-0";

    const renderContent = () => (
        <div className="no-scrollbar absolute flex h-full w-full items-center justify-center overflow-hidden">
            {children}
        </div>
    );

    if(isMobilePreview) {
        return (
            <div 
                className="relative h-[90%] max-h-[40rem] w-[22rem] overflow-hidden rounded-[3rem] border-[6px] border-slate-400">
                <div className="absolute left-1/2 right-1/2 top-2 z-20 h-4 w-1/3 -translate-x-1/2 transform rounded-full bg-slate-400"></div>
                {renderContent()}
            </div>
        )
    } else {
        <div className="flex min-h-dvh flex-col items-center justify-center">
            <div className="relative w-full">{children}</div>
        </div> 
    }
}