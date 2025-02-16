// offset = 0 -> current question card
// offset < 0 -> Question cards that are already answered
// offset > 0 -> Question cards that are not answered

import { useEffect, useMemo, useRef, useState } from "react";
import { TForm } from "@/types/forms";
// import "../../styles/global.css"
// import "../../styles/preflight.css"

interface StackedCardContainerProps {
    cardArrangement: string;
    currentQuestionId: string;
    getCardContent: (questionIdx: number, offset: number) => JSX.Element | undefined;
    form: TForm,
    setQuestionId: React.Dispatch<React.SetStateAction<string>>;
}

const StackedCardContainer: React.FC<StackedCardContainerProps> = ({
    cardArrangement,
    currentQuestionId,
    getCardContent,
    form,
    setQuestionId,
}) => {
    const [hovered, setHovered] = useState(false);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const resizeObserver = useRef<ResizeObserver | null>(null);
    const [cardHeight, setCardHeight] = useState("auto");
    const [cardWidth, setCardWidth] = useState<number>(0);

    const questionIdxTemp = useMemo(() => {
        if (currentQuestionId === 'start' && form.welcomeCard?.enabled) return -1;
        return form.questions.findIndex(question => question.id === currentQuestionId);
    }, [currentQuestionId, form.welcomeCard, form.questions]);
    

    const [prevQuestionIdx, setPrevQuestionIdx] = useState(questionIdxTemp - 1);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(questionIdxTemp);
    const [nextQuestionIdx, setNextQuestionIdx] = useState(questionIdxTemp + 1);
    const [visitedQuestionIdx, setVisitedQuestionIdx] = useState<number[]>([]);
    useEffect(() => {
        if (questionIdxTemp > currentQuestionIdx) {
            // Next question is clicked
            setPrevQuestionIdx(currentQuestionIdx);
            setCurrentQuestionIdx(questionIdxTemp);
            setNextQuestionIdx(questionIdxTemp + 1);
            setVisitedQuestionIdx((prev) => [...prev, questionIdxTemp]);
        } else if (questionIdxTemp < currentQuestionIdx) {
            // Previous question is clicked
            setCurrentQuestionIdx(currentQuestionIdx);
            setNextQuestionIdx(currentQuestionIdx + 1);
            setPrevQuestionIdx(visitedQuestionIdx[visitedQuestionIdx.length - 2]);
            setVisitedQuestionIdx((prev) => {
                if (prev.length > 0) {
                    const newStack = prev.slice(0, -1);
                    return newStack;
                }
                return prev;
            });
        }
    }, [questionIdxTemp]);

    // UseEffect to handle the resize of current question card and set card height accordingly
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentElement = cardRefs.current[questionIdxTemp];
            if (currentElement) {
                if (resizeObserver) {
                    resizeObserver.current?.disconnect();
                }
                // resizeObserver.current = new ResizeObserver((entries) => {
                //     for (const entry of entries) {
                //         setCardHeight(entry.target.height + "px");
                //         setCardWidth(entry.target.width);
                //     }
                // });
                // resizeObserver.current?.observe(currentElement);
            }
        }, 0);
        return () => {
            resizeObserver.current?.disconnect();
            clearTimeout(timer);
        }
    }, [visitedQuestionIdx, cardRefs, cardArrangement]);

    
    useEffect(() => {
        console.log('questionIdx: ', questionIdxTemp);
        console.log("currentQuestionIdx: ", currentQuestionId);
        console.log("form welcome enabled: ", form.welcomeCard.enabled);
    }, [questionIdxTemp, currentQuestionId, form.welcomeCard.enabled]);

    return (
        <div 
            className="relative flex h-full items-end justify-center md:items-center"
            onMouseEnter={() => { setHovered(true) }}
            onMouseLeave={() => { setHovered(false) }}>
            <div style={{ height: cardHeight }}>
            {cardArrangement === "simple" ? (
                <div 
                    className="w-full"
                    // style={{
                    //     ...borderStyles
                    // }}    
                >
                    {getCardContent(questionIdxTemp, 0)}
                </div>
            ): (
                questionIdxTemp !== undefined &&
                [prevQuestionIdx, currentQuestionIdx, nextQuestionIdx, nextQuestionIdx + 1].map(
                    (questionIdxTemp, index) => {
                        // check for hiding extra cards
                        if (form.thankYouCard.enabled) {
                            if (questionIdxTemp > form.questions.length)  return;
                        } else {
                            if (questionIdxTemp > form.questions.length - 1)  return;
                        }
                        const offset = index -1;
                        const isHidden = offset < 0
                        return (
                            <div
                                ref={(el) => (cardRefs.current[questionIdxTemp] = el)} 
                                id={`questionCard-${questionIdxTemp}`}
                                key={questionIdxTemp}
                                style={{
                                    zIndex: 1000 - questionIdxTemp,
                                    transform: `translateY(${offset * 100}%)`,
                                    opacity: isHidden ? 0 : (100 - 0 * offset / 10),
                                    height: "100%",
                                    transitionDuration: "600ms",
                                    pointerEvents: offset === 0 ? "auto" : "none",
                                    // ...borderStyles
                                }}
                                className="cursor-pointer rounded-custom bg-survey-bg absolute inset-x-0 backdrop-blur-md transition-all ease-in-out"
                                >
                                {getCardContent(questionIdxTemp, offset)}
                            </div>
                        );
                    }
                )
            )}
            </div>
        </div>
    )
}

export default StackedCardContainer;