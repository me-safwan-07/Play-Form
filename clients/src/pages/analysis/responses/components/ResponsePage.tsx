import { CustomFilter } from "../../components/CustomFilter"
import { ResultsShareButton } from "../../components/ResultsShareButton"
import { ResponseTimeline } from "./ResponseTimeline"

export const ResponsePage = () => {
    return (
        <>
            <div className="flex gap-1.5">
                <CustomFilter />
                <ResultsShareButton />
            </div>
            <ResponseTimeline />
        </>
    );
};