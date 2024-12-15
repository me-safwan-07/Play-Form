import { PageHeader } from "@/components/core/PageHeader"
import { PlusIcon } from "lucide-react"
import { FormList } from "../../components/core/FormsList/components/FormList";
import { FormFilters } from "../../components/core/FormsList/components/FormFilters";
import { useQuery } from "@tanstack/react-query";
import { forms } from "@/lib/api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { TFormFilters } from "@/types/forms";
import { PageContentWrapper } from "@/components/ui/PageContentWrapper";
import { FormsList } from "@/components/core/FormsList";
import Button from "@/components/ui/Button/index";

export const initialFilters: TFormFilters = {
    name: "",
    // createdBy: [],
    status: [],
    // type: [],
    sortBy: "updatedAt"
}
const Page = () => {
    // const {id} = useParams()
    

    const createFormButton = (
        <Button
            size="sm"
            href={`/forms/templates`}
            variant="darkCTA"
            EndIcon={PlusIcon}
        >
            New survey
        </Button>
    )

    return (
        <PageContentWrapper>
            <PageHeader pageTitle="Match Form" cta={createFormButton} />
            <FormsList />
        </PageContentWrapper>
    )
};

export default Page;