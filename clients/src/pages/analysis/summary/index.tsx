import { PageContentWrapper } from "@/components/ui/PageContentWrapper";
import { FormAnalysisNavigation } from "../components/FormAnalysisNavigation";
import { SummaryPage } from "./components/SummaryPage";
import { FormAnalysisCTA } from "../components/FormAnalysisCTA";
import { PageHeader } from "@/components/ui/PageHeader";

const form = {
    "id": "63e7f64d-d594-4b90-b8d8-53653d92006e",
    // "organizationId": "63e7f56a-d594-4b90-b8d8-53653d92006d",
    "name": "Mubark criekters gangolli",
    "createdAt": "2023-03-20T09:10:30",
    "updatedAt": "2023-03-20T09:10:30",
    "status": "inProgress",
    // "surveyStatus": "completed",
}
const Summary = () => {
    return (
        <PageContentWrapper>
            <PageHeader
                pageTitle={form.name}
                cta={
                    <FormAnalysisCTA form={form} isViewer={false}/>
                }
            >
                <FormAnalysisNavigation 
                    activeId="summary"
                />
            </PageHeader>
            <SummaryPage />
        </PageContentWrapper>
    )
};

export default Summary;