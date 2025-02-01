// import { PageHeader } from "@/components/PageHeade;
import { PageContentWrapper } from "@/components/ui/PageContentWrapper";
import { FormAnalysisNavigation } from "../components/FormAnalysisNavigation";
import { FormAnalysisCTA } from "../components/FormAnalysisCTA";
import { ResponsePage } from "./components/ResponsePage";
import { PageHeader } from "@/components/ui/PageHeader";

const form = {
    "id": "63e7f64d-d594-4b90-b8d8-53653d92006e",
    // "organizationId": "63e7f56a-d594-4b90-b8d8-53653d92006d",
    "name": "Mubark criekters gangolli",
    "createdAt": new Date("2023-03-20T09:10:30"),
    "updatedAt": new Date("2023-03-20T09:10:30"),
    "status": "inProgress" as "inProgress",
    "welcomeCard": {
        "enabled": true,
        "showResponseCount": true
    },
    "questions": [],
    "thankYouCard": {
        "enabled": true,
        "message": "Thank you for your response!"
    }
    // "surveyStatus": "completed",
}
const Responses = () => {
    return (
        <PageContentWrapper>
            <PageHeader
                pageTitle={form.name}
                cta={
                    <FormAnalysisCTA form={form} isViewer={false}/>
                }
            >
                <FormAnalysisNavigation 
                    activeId="response"
                />
            </PageHeader>
            <ResponsePage />
        </PageContentWrapper>
    )
};

export default Responses;