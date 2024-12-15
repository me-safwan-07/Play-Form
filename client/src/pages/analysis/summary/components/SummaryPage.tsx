// import { boolean } from "zod"
import { SummaryMetadata } from "./SummaryMetadata"
// import { useState } from "react";
import { CustomFilter } from "../../components/CustomFilter";
import { ResultsShareButton } from "../../components/ResultsShareButton";
import { SummaryList } from "./SummaryList";

export const SummaryPage = () => {
    // const [showDropdOffs, setShowDropOffs] = useState<boolean>(false);
    return (
        <>
            <SummaryMetadata 
                // showDropOffs={showDropdOffs}
                // setShowDropOffs={setShowDropOffs}
            />
            <div className="flex gap-1.5">
                <CustomFilter />
                <ResultsShareButton />
            </div>
            <SummaryList />
        </>
    )
}