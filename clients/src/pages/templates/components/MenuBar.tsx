import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MenuBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="border-b border-slate-200 bg-white px-5 py-3 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center space-x-2 whitespace-nowrap">
                    <Button
                        variant="secondary"
                        StartIcon={ArrowLeftIcon}
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        Back
                    </Button>
                </div>
            </div>
        </>
    )
}