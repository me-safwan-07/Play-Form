import { useParams, useNavigate } from "react-router-dom";
import { TemplateContainerWithPreview } from "./components/TemplateContainer";
import { useEffect } from "react";

const Templates = () => {
    const { environmentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Templates-environmentId", environmentId);
    }, [environmentId]); // Dependency array added

    if (!environmentId) {
        console.error("Environment not found in parent components");
        // navigate('/auth/login'); // Uncomment this if you want to redirect instead of throwing an error
        throw new Error("Environment not found in parent components");
    }

    return (
        <TemplateContainerWithPreview environmentId={environmentId} />
    );
};

export default Templates;
