import { Route, Routes } from "react-router-dom";
import Summary from "./summary";
import Responses from "./responses/page";
import NotFound from "@/components/ui/NotFound";

const Analysis = () => {
    return (
        <Routes>
            <Route path="/summary" element={<Summary />} />
            <Route path="/responses" element={<Responses />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}

export default Analysis;