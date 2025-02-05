import { useCallback, useMemo } from "react";
import { Progress } from "./Progress";
import { calculateElementIdx } from "../../lib/utils";
import { TForm } from "@/types/forms";

interface ProgressBarProps {
    form: TForm;
    questionId: string;
}

export const ProgressBar = ({ form, questionId }: ProgressBarProps) => {
    const currentQuestionIdx = useMemo(
        () => form.questions.findIndex((q) => q.id === questionId),
        [form, questionId]
    );
    
    const calculatedProgress = useCallback(
        (index: number, questionsLength: number) => {
            if (questionsLength === 0) return 0;
            if (index === -1) index = 0;

            const elementIdx = calculateElementIdx(form, index);
            return elementIdx / questionsLength;
        },
        [form]
    );

    const progressArray = useMemo(() => {
        return form.questions.map((_, index) => calculatedProgress(index, form.questions.length));
    }, [form, calculatedProgress]);

    return (
        <Progress 
            progress={questionId === "end" ? 1 : questionId === "start" ? 0 : progressArray[currentQuestionIdx]}
        />
    )
};