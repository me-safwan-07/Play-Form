import { useState } from "react";
import { FormFilters } from "./components/FormFilters";
import { TFormFilters } from "@/types/forms";

export const initialFilters: TFormFilters = {
    name: "",
    status: [],
    sortBy: "createdAt",
};

export const FormsList = () => {

    const [formFilters, setFormFilters] = useState<TFormFilters>(initialFilters);
    const [orientation, setOrientation] = useState<string>("grid");
    return (
        <div className="">
            <FormFilters
                orientation={orientation}
                setOrientation={setOrientation}
                formFilters={formFilters}
                setFormFilters={setFormFilters}
            />
        </div>
    )
};