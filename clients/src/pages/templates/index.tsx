import { useParams, useNavigate } from "react-router-dom";
import { TemplateContainerWithPreview } from "./components/TemplateContainer";

const Templates = () => {
    const { environmentId } = useParams();
    const navigate = useNavigate();

    // check if the evnironmenid correct using api (getEnvironmentId)


    if (!environmentId) {
        console.error("Environment not found in parent components");
        navigate('/auth/login');
        throw new Error("Environment not found in parent components");
    }

    return (
        <TemplateContainerWithPreview 
            environmentId={environmentId} 
        />
    );
};

export default Templates;
