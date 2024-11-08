import { PageHeader } from "@/components/core/common/PageHeader"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { FormList } from "./components/FormList";
import { SurveyFilters } from "./components/FormFilters";

const Page = () => {
    const createFormButton = (
        <Button 
            size="sm"
            // After the creating the api of bellow we will uncomment this href line
            // href={`/environment/${environment.id}/form/templates`}
            // EndIcon={PlusIcon}
        >
            New survey
        </Button>
    )

    return (
        <>
            <PageHeader pageTitle="Match Form" cta={createFormButton} />
            <SurveyFilters />
            <FormList />
        </>
    )
};

export default Page;