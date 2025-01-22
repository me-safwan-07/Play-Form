import { TEnvironment } from "@/types/environment"
import { StartFromScratchTemplate } from "./components/StartFromScratchTemplate"


interface TemplateListProps {
    environment?: TEnvironment;
    templateSearch?: string;
    onTemplateClick?: (template: string) => void;
}
export const TemplateList = ({
    // environment,
    // templateSearch,
    // onTemplateClick,
}: TemplateListProps) => {    
    return (
       <main className="">
            <div className="">
                <StartFromScratchTemplate />
            </div>
       </main> 
    )
}