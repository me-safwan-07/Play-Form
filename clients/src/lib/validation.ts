import { TFormThankYouCard, TFormWelcomeCard } from "@/types/forms";

export const isCardValid = (
    card: TFormWelcomeCard | TFormThankYouCard,
    cardType: "start" | "end",
): boolean => {
    const isContentValid = (content: Record<string, string> | string | undefined) => {
        return content === undefined;
    };

    return (
        (card.headline ? isContentValid(card.headline): true) &&
        isContentValid(
            // remove the headline to html in cardType === start
            cardType === "start" ? (card as TFormWelcomeCard).headline : (card as TFormThankYouCard).subheader
        ) && 
        isContentValid(card.buttonLabel)
    );
};