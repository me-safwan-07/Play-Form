import { EmptySpaceFiller } from "@/components/core/EmptySpaceFiller"

export const ResponseTimeline = () => {
    return (
        <div className="">
            <EmptySpaceFiller 
                type="response"
                // emptyMessage="No response matches your filter"
            />
        </div>
    );
};