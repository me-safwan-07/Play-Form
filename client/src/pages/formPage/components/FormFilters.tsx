import { SearchBar } from "@/components/ui/SearchBar";
import { useState } from "react";

const creatorOptions = [
    { label: "you", value: "you" },
    { label: "Others", value: "others"},
];

const statusOptions = [
    { label: "In Progress", value: "inProgress" },
    { label: "Scheduled", value: "scheduled" },
    { label: "Paused", value: "paused" },
    { label: "Completed", value: "completed" },
    { label: "Draft", value: "draft" },
];

const sortOptions = [
    {
      label: "Last Modified",
      value: "updatedAt",
    },
    {
      label: "Created On",
      value: "createdAt",
    },
    {
      label: "Alphabetical",
      value: "name",
    },
    {
      label: "Relevance",
      value: "relevance",
    },
];

export const SurveyFilters = () => {
    const [name, setName] = useState("");
    return (
        <div className="">
            <div className="">
                <SearchBar 
                    value={name}
                    placeholder={"Search by survey name"}
                    className="border-slate-700"
                />
            </div>
        </div>
    )
}