import { SecondaryNavigation } from "@/components/core/SecondaryNavigation"
import { InboxIcon, PresentationIcon } from "lucide-react"

interface FormAnalysisNavigationProps {
    activeId: string;
}
export const FormAnalysisNavigation = ({
    activeId
}: FormAnalysisNavigationProps) => {
    const navigation = [
        {
            id: "summary",
            label: "Summary",
            icon: <PresentationIcon className="h-5 w-5"/>,
            href: `/analysis/summary`,
            // onClick: () => {
            //     navigate("/analysis/summary")
            // }
        },
        {
            id: "response",
            label: "Response",
            icon: <InboxIcon className="h-5 w-5"/>,
            href: `/analysis/responses` ,
            // onClick: () => {
            //     navigate("/analysis/reponses")
            // }
        }
    ]
    return <SecondaryNavigation navigation={navigation} activeId={activeId}/>
}