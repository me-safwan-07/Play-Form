import { customForm } from "@/lib/templates";
import { TTemplate } from "@/types/templates";
import { useState } from "react";
import { MenuBar } from "./MenuBar";
import { SearchBox } from "@/components/ui/SearchBox";
import { TemplateList } from "@/components/ui/TemplateList";
import { FormPreview } from "@/pages/PreviewPage";
import { minimalForm } from "@/lib/minimalForm";

type TemplateContainerWithPreviewProps = {
    environmentId: string;
}

export const TemplateContainerWithPreview = ({
    environmentId,
}: TemplateContainerWithPreviewProps) => {
    const initialTemplate = customForm;
    const [activeTemaplate, setActiveTemplate] = useState<TTemplate>(initialTemplate);
    const [activeQuestionId, setActiveQuestionId] = useState<string>(initialTemplate.preset.questions[0].id);
    const [templatesSearch, setTemplateSearch] = useState<string | null>(null);

    return (
        <div className="flex h-full flex-col">
            <MenuBar />
            <div className="relative z-0 flex flex-1 overflow-hidden">
                <div className="flex-1 flex-col overflow-auto bg-slate-50">
                    <div className="mb-3 ml-6 mt-6 flex flex-col items-center justify-between md:flex-row md:items-end">
                        <h1 className="text-2xl font-bold text-slate-800">Create a new survey</h1>
                        <div className="px-6">
                            <SearchBox 
                                autoFocus
                                value={templatesSearch ?? ""}
                                onChange={(e) => setTemplateSearch(e.target.value)}
                                placeholder="Search..."
                                className="block rounded-md border border-slate-100 bg-white shadow-sm focus:border-slate-500 focus:outline-none focus:ring-0 sm:text-sm md:w-auto"
                                type="search"
                                name="search"
                            />
                        </div>
                    </div>

                    <TemplateList 
                        templateSearch={templatesSearch ?? ""}
                        onTemplateClick={(template) => {
                            setActiveQuestionId(template.preset.questions[0]?.id);
                            setActiveTemplate(template);
                        }}
                        environmentId={environmentId}
                    />
                </div>
                {/* <aside className="">
                    {activeTemaplate && (
                        <div className="">
                            <FormPreview 
                                form={{ ...minimalForm, ...activeTemaplate.preset}}
                                questionId={activeQuestionId}
                            />
                        </div>
                    )}
                </aside> */}
            </div>
        </div>
    )
}