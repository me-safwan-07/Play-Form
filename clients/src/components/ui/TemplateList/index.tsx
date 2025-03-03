import { StartFromScratchTemplate } from "./components/StartFromScratchTemplate"
import { TTemplate } from "@/types/templates";
import { TFormInput } from "@/types/forms";
import { useNavigate, useParams } from "react-router-dom";
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

    if(!environmentId) {
        throw new Error("Environment not found")
    }

    const createForms = async (activeTemplate: TTemplate) => {
        setLoading(true);
        const augmentedTemplate: TFormInput = {
            ...activeTemplate.preset,
            createdBy: environmentId,
        };
        console.log("ActiveTemplate:", activeTemplate);
        console.log("augmentedTemplate", augmentedTemplate);
        try {
            const reponse = await axios.post("http://localhost:3000/api/forms",
                augmentedTemplate,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (reponse.status !== 201) {
                console.log(reponse)
                throw new Error(`create form error ${reponse}`)
            } 
            // navigate(`/environments/${environmentId}/forms/${reponse.id}/edit`);

        } catch (err) {
            console.error("Error creating form:", err)
        }
        
    }  
    return (
        <main className="">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <StartFromScratchTemplate 
                    activeTemplate={activeTemplate}
                    setActiveTemplate={setActiveTemplate}
                    onTemplateClick={onTemplateClick}
                    createForm={createForms}
                    loading={loading}
                />
            </div>
       </main> 
    )
}