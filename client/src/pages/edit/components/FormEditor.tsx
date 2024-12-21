import { PreviewForm } from "@/components/ui/PreviewSurvey"
import { FormMenuBar } from "./FormMenuBar"
import { QuestionsAudienceTabs } from "./QuestionsStylingSettingsTabs"
import { QuestionsView } from "./QuestionsView"
import { TForm } from "@/types/forms";

interface FormEditorProps {
    form: TForm;
}
export const FormEditor =({
    form
}: FormEditorProps) => {
    return (
        <>
            <div className="flex h-full w-full flex-col">
                {/* <FormMenuBar /> */}
                <div className="relative z-0 flex flex-1 overflow-hidden">
                    <main
                        className="relative z-0 w-1/2 flex-1 overflow-y-auto focus:outline-none"
                    >
                        {/* <QuestionsAudienceTabs  
                            activeId="questions"
                            isStylingTabVisible={true}
                        /> */}

                        <QuestionsView 
                            form={form}
                        />
                    </main>
                    <aside className="group hidden flex-1 flex-shrink-0 items-center justify-center overflow-hidden border-l border  border-slate-100 bg-slate-50 py-6 md:flex md:flex-col">
                        <PreviewForm 
                            previewType= "modal"
                        />
                    </aside>
                </div>
            </div>
        </>
    )
}