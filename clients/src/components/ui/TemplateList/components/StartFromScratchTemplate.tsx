import { customForm, replacePresetPlaceholders } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "../../Button";
import { TTemplate } from "@/types/templates";


interface StartFromScratchTemplateProps {
    activeTemaplate: TTemplate | null;
    setActiveTemplate: (template: TTemplate) => void;
    onTemplateClick: (template: TTemplate) => void;
    createForm: (template: TTemplate) => void;
    loading: boolean
}

export const StartFromScratchTemplate = ({
    activeTemaplate,
    setActiveTemplate,
    onTemplateClick,
    createForm,
    loading,
}: StartFromScratchTemplateProps) => {
    return (
        <button
            type="button"
            onClick={() => {
                const newTemplate = replacePresetPlaceholders(customForm);
                onTemplateClick(newTemplate);
                setActiveTemplate(newTemplate)
            }}
            className={cn(
                activeTemaplate?.name === customForm.name
                    ? "ring-brand border-transparent ring-2"
                    :"hover:border-brand-dark border-dashed border-slate-300",
                    "duration-120 group relative rounded-lg border-2 bg-transparent p-6 transition-colors duration-150"
            )}
        >
            <PlusCircleIcon className="text-brand-dark h-8 w-8 transition-all duration-150 group-hover:scale-110" />
            <h3 className="text-md mb-1 mt-3 text-left font-bold text-slate-700">{customForm.name}</h3>
            <p className="text-left text-xs text-slate-600">{customForm.description}</p>
+           {activeTemaplate?.name === customForm.name && ( 
                <div className="text-left">
                    <Button
                        className="mt-6 px-6 py-3"
                        disabled={activeTemaplate === null}
                        loading={loading}
                        onClick={() => createForm(activeTemaplate)}
                    >
                        Create form
                    </Button>
                </div>
            )}
        </button>
    );
};