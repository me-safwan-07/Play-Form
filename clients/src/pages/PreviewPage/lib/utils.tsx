import { TForm } from "@/types/forms";

export const calculateElementIdx = (form: TForm, currentQuestionIdx: number): number => {
    const formLength = form.questions.length;
    const middleIdex = Math.floor(formLength /2);

    const getLastQuestionIdx = () => {
        // get last question idx
        const lastQuestion = form.questions 
            .sort((a, b) => form.questions.indexOf(a) - form.questions.indexOf(b))
            .pop();
        return form.questions.findIndex((e) => e.id === lastQuestion?.id);
    }

    let elmentIdx = currentQuestionIdx || 0.5;
    const lastPrevQuestionIdx = getLastQuestionIdx();

    if (lastPrevQuestionIdx > 0) elmentIdx = Math.min(middleIdex, lastPrevQuestionIdx);

    return elmentIdx;
}