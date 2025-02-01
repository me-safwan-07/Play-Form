import { SecondaryNavigation } from "@/components/SecondaryNavigation"
import { InboxIcon, PresentationIcon } from "lucide-react"
import { useParams } from "react-router-dom";

interface FormAnalysisNavigationProps {
    activeId: string;
}
export const FormAnalysisNavigation = ({
    activeId
}: FormAnalysisNavigationProps) => {
    const { environmentId, formId } = useParams();
    const navigation = [
        {
            id: "summary",
            label: "Summary",
            icon: <PresentationIcon className="h-5 w-5"/>,
            href: `/environments/${environmentId}/forms/${formId}/summary`,
            // onClick: () => { 
            //     navigate("/analysis/summary")
            // }
        },
        {
            id: "response",
            label: "Response",
            icon: <InboxIcon className="h-5 w-5"/>,
            href: `/environments/${environmentId}/forms/${formId}/responses` ,
            // onClick: () => {
            //     navigate("/analysis/reponses")
            // }
        }
    ]
    return <SecondaryNavigation navigation={navigation} activeId={activeId}/>
}