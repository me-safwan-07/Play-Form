
import { useEffect, useState } from "react"

export const useFormScript = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadScript = async () => {
            if (window.playforms) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/form/`);

                if(!response) {
                    throw new Error("Failed to load the forms package");
                }

                const scriptContent = await response.text();
                const scriptElement = document.createElement("script");

                scriptElement.textContent = scriptContent;
                document.head.appendChild(scriptElement);

                setLoading(false);
            } catch (err) {
                console.error("Error loading form script", err);
                setError("Failed to load the form script");
                setLoading(false);
            }
        };

        loadScript();
    }, []);

    return { loading, error };
};