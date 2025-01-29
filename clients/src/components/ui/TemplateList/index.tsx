import { TEnvironment } from "@/types/environment"
import { StartFromScratchTemplate } from "./components/StartFromScratchTemplate"
import { TTemplate } from "@/types/templates";
import { TFormInput } from "@/types/forms";
import { createForm } from "@/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


interface TemplateListProps {
    environment?: string;
    templateSearch?: string;
    onTemplateClick?: (template: string) => void;
}
export const TemplateList = ({
    environment,
    // templateSearch,
    // onTemplateClick,
}: TemplateListProps) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // const createForms = async (activeTemplate: TTemplate) => {
    //     setIsLoading(true);
    //     const augmentedTemplate: TFormInput = {
    //         ...activeTemplate.preset,
    //     };
    //     const form = await createForm(augmentedTemplate);
    //     navigate(`/environments/${environmentId}/forms/${form.id}/edit`);
    // }  
    return (
        <main className="">
            <div className="">
                <StartFromScratchTemplate />
            </div>
       </main> 
    )
}