import { FormMenuBar } from "./FormMenuBar"
import { QuestionsView } from "./QuestionsView"
import { TForm, TFormEditorTabs } from "@/types/forms";
import { useEffect, useRef, useState } from "react";
import { structuredClone } from "@/lib/pollyfills/structuredClone";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { FormPreview } from "@/pages/PreviewPage";

interface FormEditorProps {
    form: TForm;
    environmentId: string;
    responseCount: number;
}
export const FormEditor =({
    form,
    environmentId,
    responseCount
}: FormEditorProps) => {
    const [activeView, setActiveView] = useState<TFormEditorTabs>("questions");
    const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
    const [localForm, setLocalForm] = useState<TForm | null>(() => structuredClone(form));
    const [invalidQuestions, setInvalidQuestions] = useState<string[] | null>(null);
    const formEditorRef = useRef(null);

    useEffect(() => {
        if(form) {
            const formClone = structuredClone(form);
            setLocalForm(formClone);

            if(form.questions.length > 0) {
                setActiveQuestionId(form.questions[0].id);
            }
        }
    }, [form]);

    // when the form type changes, we need to reset the active question id to the first question
    useEffect(() => {
        if(localForm?.questions?.length && localForm.questions.length > 0) {
            setActiveQuestionId(localForm.questions[0].id);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form?.questions]);


    useEffect(() => {
        console.log("active", activeQuestionId)
    }, [activeQuestionId])
    if(!localForm) {
        return <LoadingSkeleton />
    }
    return (
        <>
            <div className="scroll-hidden flex h-full w-full flex-col">

                <FormMenuBar
                    localForm={localForm}
                    setLocalForm={setLocalForm}
                    form={form}
                    environmentId={environmentId}
                    activeId={activeView}
                    setActiveId={setActiveView}
                    // setInvalidQuestions={setInvalidQuestions}
                    responseCount={responseCount}
                />
                <div className="relative z-0 flex flex-1">
                    <main
                        className="relative z-0 w-1/2 flex-1 overflow-y-auto focus:outline-none"
                        ref={formEditorRef}
                    >
                        {/* <QuestionsAudienceTabs 
                            activeId={activeView}
                            setActiveId={setActiveView}
                            isStylingTabVisible={true}
                        /> */}

                        {activeView === "questions" && (
                            <QuestionsView 
                                localForm={localForm}
                                setLocalForm={setLocalForm}
                                activeQuestionId={activeQuestionId}
                                setActiveQuestionId={setActiveQuestionId}
                                invalidQuestions={invalidQuestions}
                                setInvalidQuestions={setInvalidQuestions}
                            />
                        )}
                    </main>

                    <aside className="group hidden flex-1 flex-shrink-0 items-center justify-center overflow-hidden border-l border  border-slate-100 bg-slate-50 py-6 md:flex md:flex-col">
                        {/* <FormPreview 
                            form={localForm}
                            questionId={activeQuestionId}
                        /> */}
                    </aside>
                </div>
            </div>
        </>
    )
}