// import { useQuery } from "@tanstack/react-query";
import { FormFilters } from "./components/FormFilters"
// import { forms } from "@/lib/api";
import { useEffect, useState } from "react";
import { TFormFilters } from "@/types/forms";
// import { useDebounce } from "react-use";
import axios from "axios";
import { FormCard } from "./components/FormCard";
// import Button from "@/components/ui/Button/index";
// interface FormsListProps {
//     formsPerPage: number;
// }
export const initialFilters: TFormFilters = {
    name: "",
    // createdBy: [],
    status: [],
    sortBy: "updatedAt"
}
export const FormsList = () => {
    const [forms, setForms] = useState<TFormFilters[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    // const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        setIsFetching(true);
        const fetchInitialForms = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/forms');
                // if (res.length < formsLimit) {
                //     setHasMore(false);
                // } else {
                //     setHasMore(true);
                // }
                setForms(res.data);
                setIsFetching(false);
            } catch (err) {
                console.error(err);
                setIsFetching(false);
            }
        }
        fetchInitialForms();
    }, []);

    const [formFilters, setFormFilters] = useState<TFormFilters>(initialFilters);
    const [orientation, setOrientation] = useState("");

    useEffect(() => {
        // Initialize orientation state with a function that checks if window is defined
        const orientationFromLocalStorage = localStorage.getItem("formOrientation");
        if (orientationFromLocalStorage) {
          setOrientation(orientationFromLocalStorage);
        } else {
          setOrientation("grid");
          localStorage.setItem("formOrientation", "list");
        }
      }, []);

    return (
        <div className="space-y-6">
            <FormFilters
                orientation={orientation}
                setOrientation={setOrientation}
                formFilters={formFilters}
                setFormFilters={setFormFilters}
            />
            {forms && forms.length > 0 ? (
                <div className="">
                    {orientation === "list" && (
                        <div className="flex-col space-y-3">
                            <div className="mt-6 grid w-full grid-cols-8 place-items-center gap-3 px-6 text-sm text-slate-800">
                                <div className="col-span-4 place-self-start">Name</div>
                                <div className="col-span-4 grid w-full grid-cols-5 place-items-center">
                                    <div className="col-span-2">Created at</div>
                                    <div className="col-span-2">Updated at</div>
                                </div>
                            </div>
                            {forms.map((form) => {
                                return (
                                    <FormCard
                                    orientation={orientation}
                                    form={form}
                                    />
                                )
                            })}
                        </div>
                    )}
                    {orientation === "grid" && (
                        <div className="flex-col space-y-3">
                            {forms.map((form) => {
                                return (
                                    <FormCard
                                    orientation={orientation}
                                    form={form}
                                    />
                                )
                            })}
                        </div>
                    )}
                    
                    {/* uncommet this when complete alle the api's */}
                    {/* {hasMore && (
                        <div className="">
                            <Button
                                variant='secondary'
                                size='sm'
                                loading={isFetching}
                            >
                                Load more
                            </Button>
                        </div>
                    )} */}
                </div>
            ) : (
                <div className="flex h-full flex-col items-center justify-center">
                    <span className="mb-4 h-24 w-24 rounded-full bg-slate-100 p-6 text-5xl">🕵️</span>

                    <div className="text-slate-600">{isFetching ? "Fetching surveys..." : "No surveys found"}</div>
                </div>
            )}
        </div>
    );
};
