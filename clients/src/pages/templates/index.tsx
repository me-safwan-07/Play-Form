import { Navigate, useNavigate, useParams } from "react-router-dom";
import { TemplateContainerWithPreview } from "./components/TemplateContainer";

const Templates = () => {
    const navigate = useNavigate();
    const { environmentId } = useParams();

    if (!environmentId) {
        navigate('/auth/login');
        return null;
    }
    return (
        <TemplateContainerWithPreview />
    )
};

export default Templates;