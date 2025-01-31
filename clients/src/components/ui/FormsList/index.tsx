import { useEffect, useMemo, useState } from "react";
import { FormFilters } from "./components/FormFilters";
import { TForm, TFormFilters } from "@/types/forms";
import { FormCard } from "./components/FormCard";
import { getFormattedFilters } from "@/utils/formattedFilters";
import axios from "axios";

interface FormsListProps {
    environment: string;
    formsPerPage: number;
}

export const initialFilters: TFormFilters = {
    name: "",
    status: [],
    sortBy: "createdAt",
};

export const FormsList = ({ 
    environment, 
    formsPerPage: formsLimit
  }: FormsListProps) => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [forms, setForms] = useState<TForm[]>([]);
    const [formFilters, setFormFilters] = useState<TFormFilters>(initialFilters);
    
    const filters = useMemo(() => getFormattedFilters(formFilters), [formFilters]);


    const [orientation, setOrientation] = useState<string>("grid");

    useEffect(() => {
        // Initialize orientation state with a function that checks if window is defined
        const orientationFromLocalStorage = localStorage.getItem("surveyOrientation");
        if (orientationFromLocalStorage) {
        setOrientation(orientationFromLocalStorage);
        } else {
        setOrientation("grid");
        localStorage.setItem("surveyOrientation", "list");
        }
    }, []);

    useEffect(() => {
      const token = localStorage.getItem('token');
      const fetchForms = async () => {
        const res = await axios.get('http://localhost:3000/api/forms/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          // how to write the query params?
          params: {
            formsLimit,
            page: undefined,
            offset: filters
          }
        });
        if (res.data.forms.length < formsLimit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setForms(res.data.forms);
        setIsFetching(false);
      };
      fetchForms();
    }, [environment, formsLimit, filters]);



    const handleDeleteSurvey = async (surveyId: string) => {
        const newForms = forms.filter((forms) => forms.id !== surveyId);
        setForms(newForms);
    };

    const handleDuplicateSurvey = async (form: TForm) => {
        const newForms = [...forms, form];
        setForms(newForms);
    };

    return (
        <div className="space-y-4">
            <FormFilters
                orientation={orientation}
                setOrientation={setOrientation}
                formFilters={formFilters}
                setFormFilters={setFormFilters}
            />
            {forms.length > 0 ? (
                <div>
                {orientation === "list" && (
                  <div className="flex-col space-y-3">
                    <div className="hidden md:flex flex-row justify-between">
                        <div className="w-1/4">Name</div>
                        <div className="w-1/4">Status</div>
                        <div className="hidden sm:block w-1/4">Responses</div>
                        <div className="hidden sm:block w-1/4">Created at</div>
                        <div className="hidden sm:block w-1/4">Updated at</div>
                    </div>
                    {forms.map((form: TForm) => {
                      return (
                        <FormCard
                          key={form.id}
                          form={form}
                          environment={environment}
                          orientation={orientation}
                          duplicateForm={handleDuplicateSurvey}
                          deleteForm={handleDeleteSurvey}
                        />
                      );
                    })}
                  </div>
                )}
                {orientation === "grid" && (
                  <div className="grid grid-cols-1 place-content-stretch gap-4 lg:grid-cols-3 2xl:grid-cols-5">
                    {forms.map((form: TForm) => {
                      return (
                        <FormCard
                          key={form.id}
                          form={form}
                          environment={environment}
                          orientation={orientation}
                          duplicateForm={handleDuplicateSurvey}
                          deleteForm={handleDeleteSurvey}
                        />
                      );
                    })}
                  </div>
                )}
      
                {/* {hasMore && (
                  <div className="flex justify-center py-5">
                    <Button onClick={fetchNextPage} variant="secondary" size="sm" loading={isFetching}>
                      Load more
                    </Button>
                  </div>
                )} */}
              </div>
            ) : (
                <div>No forms found</div>
            )}
        </div>
    )
};