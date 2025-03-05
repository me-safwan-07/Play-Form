import { StartFromScratchTemplate } from "./components/StartFromScratchTemplate"
import { TTemplate } from "@/types/templates";
import { TFormInput } from "@/types/forms";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


interface TemplateListProps {
    environmentId: string;
    templateSearch?: string;
    onTemplateClick?: (template: TTemplate) => void;
}
export const TemplateList = ({
    environmentId,
    // templateSearch,
    onTemplateClick = () => {},
}: TemplateListProps) => {
    const navigate = useNavigate();
    const [activeTemplate, setActiveTemplate] = useState<TTemplate | null>(null);
    const [loading, setLoading] = useState(false);
    // const [selectedFilter, setSelectedFilter] = useState<

    const createForms = async (activeTemplate: TTemplate) => {
        setLoading(true);
        const augmentedTemplate: TFormInput = {
            ...activeTemplate.preset,
            // createdBy: environmentId,
            // autoClose: null,
            // redirectUrl: null,
            // displayLimit: null,
            // autoComplete: null,
            // runOnDate: null,
            // closeOnDate: null,
            // styling: null,
            // resultShareKey: null
        };
    
        console.log("ActiveTemplate:", activeTemplate);
        console.log("AugmentedTemplate:", augmentedTemplate);
    
        try {
            const response = await axios.post(
                "http://localhost:3000/api/forms",
                augmentedTemplate,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
    
            if (response.status !== 201) {
                console.error("Create form error:", response.data);
                throw new Error(`Error creating form: ${JSON.stringify(response.data)}`);
            }
    
            console.log("Form created successfully:", response.data);
            navigate(`/environments/${environmentId}/forms/${response.data.id}/edit`);
    
        } catch (err) {
            console.error("Error creating form:", err);
        } finally {
            setLoading(false);
        }
    };
      
    return (
        <main className="">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <StartFromScratchTemplate 
                    activeTemaplate={activeTemplate}
                    setActiveTemplate={setActiveTemplate}
                    onTemplateClick={onTemplateClick}
                    createForm={createForms}
                    loading={loading}
                />
            </div>
       </main> 
    )
}