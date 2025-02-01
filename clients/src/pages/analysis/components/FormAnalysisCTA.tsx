import { Badge } from "@/components/ui/Badge"
import { TForm } from "@/types/forms"
import { FormStatusDropdown } from "./FormStatusDropdown"
import Button from "@/components/ui/Button/index"
import { ShareIcon, SquarePenIcon } from "lucide-react"

interface FormAnalysisCTAProps {
    form: TForm;
    isViewer: boolean;
}

export const FormAnalysisCTA = ({
    form,
    isViewer=false
}: FormAnalysisCTAProps) => {
    return (
        <div className="hidden justify-end gap-x-1.5 sm:flex">
            <Badge text="Results are public" type="warning" size="normal" className="rounded-lg"></Badge>
            {form.status !== 'draft' && (
                <FormStatusDropdown form={form} />
            )}
            <Button
                variant="secondary"
                size="sm"
            >
                <ShareIcon className="h-5 w-5" />
            </Button>
            {!isViewer && (
                <Button
                    variant="darkCTA"
                    size="sm"
                    className="h-full w-full"
                    onClick={() => {
                        // Share form link
                    }}
                >
                    Edit
                    <SquarePenIcon className="ml-1 h-4"/>
                </Button>
            )}
        </div>
    )
}