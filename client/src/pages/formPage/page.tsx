import { PageHeader } from "@/components/core/PageHeader"
import { PlusIcon } from "lucide-react"
// import { FormList } from "../../components/core/FormsList/components/FormList";
// import { FormFilters } from "../../components/core/FormsList/components/FormFilters";
// import { useQuery } from "@tanstack/react-query";
// import { forms } from "@/lib/api";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
import { TFormFilters } from "@/types/forms";
import { PageContentWrapper } from "@/components/ui/PageContentWrapper";
import { FormsList } from "@/components/core/FormsList";
import Button from "@/components/ui/Button/index";
import { useNavigate, useParams } from "react-router-dom";
import { getEnvironments } from "@/api/environment";
import { getFormCount } from "@/api/forms";
import { TemplateList } from "@/components/ui/TemplateList";
import { FORMS_PER_PAGE } from "@/lib/constants";
import { useEffect, useState } from "react";

export const initialFilters: TFormFilters = {
    name: "",
    // createdBy: [],
    status: [],
    // type: [],
    sortBy: "updatedAt"
}
const Form: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [environment, setEnvironment] = useState<any>(null);
    const [formCount, setFormCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/auth/login");
                return;
            }

            if (!id) {
                navigate("/auth/login");
                return;
            }

            const environments = await getEnvironments(id);
            const environment = environments.find(env => env.id === id);

            if (!environment) {
                navigate("/auth/login");
                return;
            }

            setEnvironment(environment);

            const formCount = await getFormCount(id);
            setFormCount(formCount);
        };

        fetchData();
    }, [id, navigate]);

    if (!environment || formCount === null) {
        return <div>Loading...</div>;
    }

    const createFormButton = (
        <Button
            size="sm"
            href={`/environment/${environment.id}/forms/templates`}
            variant="darkCTA"
            EndIcon={PlusIcon}
        >
            New survey
        </Button>
    );

    return (
        <PageContentWrapper>
            {formCount > 0 ? (
                <>
                    <PageHeader pageTitle="Match Form" cta={createFormButton} />
                    <FormsList
                        environment={environment}
                        formsPerPage={FORMS_PER_PAGE}
                    />
                </>
            ) : (
                <>
                    <h1 className="px-6 text-3xl font-extrabold text-slate-700">
                        You&apos;re all set! Time to create your first survey.
                    </h1>
                    <TemplateList environment={environment} />
                </>
            )}
        </PageContentWrapper>
    );
};

export default Form;