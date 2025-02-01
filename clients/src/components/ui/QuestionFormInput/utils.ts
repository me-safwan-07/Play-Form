import { TForm } from "@/types/forms";

export const determineImageUploaderVisibility = (questionIdx: number, localForm: TForm) => {
    switch (questionIdx) {
        case localForm.questions.length:
            return !!localForm.thankYouCard.imageUrl;
        case -1: // welcome Card
          return false;
        default:
            // Regular Form question
            const question = localForm.questions[questionIdx];
            return (!!question && !!question.imageUrl)
    }
}