import { PreviewForm } from "@/components/ui/PreviewSurvey"
import { FormMenuBar } from "./FormMenuBar"
// import { QuestionsAudienceTabs } from "./QuestionsStylingSettingsTabs"
import { QuestionsView } from "./QuestionsView"
import { TForm } from "@/types/forms";
import { useEffect, useState } from "react";
import { structuredClone } from "@/lib/pollyfills/structuredClone";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface FormEditorProps {
    form: TForm;
}
export const FormEditor =({
    form
}: FormEditorProps) => {
    const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
    const [localForm, setLocalForm] = useState<TForm | null>(() => structuredClone(form));

    useEffect(() => {
        if(form) {
            if(localForm) return;

            const formClone = structuredClone(form);
            setLocalForm(formClone);

            if(form.questions.length > 0) {
                setActiveQuestionId(form.questions[0].id);
            }
        }

    }, [localForm]);

    // when the form type changes, we need to reset the active question id to the first question
    useEffect(() => {
        if(localForm?.questions?.length && localForm.questions.length > 0) {
            setActiveQuestionId(localForm.questions[0].id);
        }
    }, [form?.questions]);

    if(!localForm) {
        return <LoadingSkeleton />
    }
    return (
        <>
            <div className="flex h-full w-full flex-col">
                <FormMenuBar 
                    localForm={localForm}
                    setLocalForm={setLocalForm}
                />
                <div className="relative z-0 flex flex-1 overflow-hidden">
                    <main
                        className="relative z-0 w-1/2 flex-1 overflow-y-auto focus:outline-none"
                    >
                        {/* <QuestionsAudienceTabs 
                            activeId="questions"
                            isStylingTabVisible={true}
                        /> */}

                        <QuestionsView 
                            localForm={localForm}
                            setLocalForm={setLocalForm}
                            activeQuestionId={activeQuestionId}
                            setActiveQuestionId={setActiveQuestionId}
                        />
                    </main>
                    <aside className="group hidden flex-1 flex-shrink-0 items-center justify-center overflow-hidden border-l border  border-slate-100 bg-slate-50 py-6 md:flex md:flex-col">
                        <PreviewForm 
                            form={form}
                            previewType= "modal"
                        />
                    </aside>
                </div>
            </div>
        </>
    )
}