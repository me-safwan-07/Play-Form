import { useCallback, useEffect, useMemo, useState } from "react";
import { FormFilters } from "./components/FormFilters";
import { TForm, TFormFilters } from "@/types/forms";
import { FormCard } from "./components/FormCard";
import { getFormattedFilters } from "@/utils/formattedFilters";
import axios from "axios";
import Button from "../Button";

interface FormsListProps {
  environment: string;
  formsPerPage: number;
}

export const initialFilters: TFormFilters = {
  name: "",
  status: [],
  sortBy: "createdAt",
};

export const FormsList = ({ environment, formsPerPage: formsLimit }: FormsListProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [forms, setForms] = useState<TForm[]>([]);
  const [formFilters, setFormFilters] = useState<TFormFilters>(initialFilters);

  const filters = useMemo(() => getFormattedFilters(formFilters), [formFilters]);

  const [orientation, setOrientation] = useState<string>("grid");

  useEffect(() => {
    const orientationFromLocalStorage = localStorage.getItem("surveyOrientation");
    if (orientationFromLocalStorage) {
      setOrientation(orientationFromLocalStorage);
    } else {
      setOrientation("grid");
      localStorage.setItem("surveyOrientation", "list");
    }
  }, []);

  const fetchForms = async () => {
    try {
      setIsFetching(true);
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3000/api/forms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: formsLimit,
          offset: 0,
          filterCriteria: JSON.stringify(filters), // Ensure the filters are sent as a JSON string
        },
      });

      setForms(response.data.forms);
      setHasMore(response.data.forms.length >= formsLimit);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, [environment, formsLimit, filters]);

  const fetchNextPage = useCallback(async () => {
    setIsFetching(true);
    const token = localStorage.getItem("token");
    const newForms = await axios.get('http://localhost:3000/api/forms/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: formsLimit,
        offset: forms.length,
        filterCriteria: JSON.stringify(filters),
      },
    });

    if (newForms.data.forms.length === 0 || newForms.data.forms.length < formsLimit) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }

    setForms([...forms, ...newForms.data.forms]);
    setIsFetching(false);
  }, [environment, formsLimit, filters]);

  const handleDeleteSurvey = (surveyId: string) => {
    setForms(forms.filter((form) => form.id !== surveyId));
  };

  const handleDuplicateSurvey = (form: TForm) => {
    setForms([...forms, form]);
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
              {forms.map((form: TForm) => (
                <FormCard
                  key={form.id}
                  form={form}
                  environment={environment}
                  orientation={orientation}
                  duplicateForm={handleDuplicateSurvey}
                  deleteForm={handleDeleteSurvey}
                />
              ))}
            </div>
          )}
          {orientation === "grid" && (
            <div className="grid grid-cols-1 place-content-stretch gap-4 lg:grid-cols-3 2xl:grid-cols-5">
              {forms.map((form: TForm) => (
                <FormCard
                  key={form.id}
                  form={form}
                  environment={environment}
                  orientation={orientation}
                  duplicateForm={handleDuplicateSurvey}
                  deleteForm={handleDeleteSurvey}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center py-5">
              <Button onClick={fetchNextPage} variant="secondary" size="sm" loading={isFetching}>
                Load more
              </Button>
            </div>
          )}
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
