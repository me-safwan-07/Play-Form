import { QuestionOption, QuestionOptions } from "@/components/QuestionsComboBox";
import { QuestionFilterOptions } from "@/components/ResponseFilter";
import { getTodayDate } from "@/lib/forms";
import { createContext, useCallback, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

export interface FilterValue {
    questionType: Partial<QuestionOption>;
    filterType: {
        filterValue: string | undefined;
        filterComboBoxValue: string | string[] | undefined;
    };
}

export interface SelectedFilterValue {
    filter: FilterValue[];
    onlyComplete: boolean;
}

interface SelectedFilterOptions {
    questionOptions: QuestionOptions[];
    questionFilterOptions: QuestionFilterOptions[];
}

export interface DataRange {
    from: Date | undefined;
    to?: Date | undefined;
}

interface FilterDateContextProps {
    selectedFilter: SelectedFilterValue;
    setSelectedFilter: React.Dispatch<React.SetStateAction<SelectedFilterValue>>;
    selectedOptions: SelectedFilterOptions;
    setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedFilterOptions>>;
    dateRange: DateRange;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
    resetState: () => void;
};

const ResponseFilterContext = createContext<FilterDateContextProps | undefined>(undefined);

const ResponseFilterProvider = ({ children }: { children: React.ReactNode }) => {
    // state holds the filter selected value
    const [selectedFilter, setSelectedFilter] = useState<SelectedFilterValue>({
        filter: [],
        onlyComplete: false
    });
    // state holds all the options of the responses fetched
    const [selectedOptions, setSelectedOptions] = useState<SelectedFilterOptions>({
        questionFilterOptions: [],
        questionOptions: [],
    });

    const [dateRange, setDateRange] = useState<DateRange>({
        from: undefined,
        to: getTodayDate(),
    });

    const  resetState = useCallback(() => {
        setDateRange({
            from: undefined,
            to: getTodayDate(),
        });
        setSelectedFilter({
            filter: [],
            onlyComplete: false,
        })
    }, [])
    return (
        <ResponseFilterContext.Provider
            value={{
                setSelectedFilter,
                selectedFilter,
                selectedOptions,
                setSelectedOptions,
                dateRange,
                setDateRange,
                resetState,
            }}
        >
            {children}
        </ResponseFilterContext.Provider>
    );
};

const useResponseFilter = () => {
    const context = useContext(ResponseFilterContext);
    if (context === undefined) {
        throw new Error("useFilterDate must be used within a FilterDate Provider");
    }
    return context;
};

export { ResponseFilterContext, ResponseFilterProvider, useResponseFilter };