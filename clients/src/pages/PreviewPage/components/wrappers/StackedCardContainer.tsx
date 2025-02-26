import { useEffect, useMemo, useRef, useState } from "react";
import { TForm } from "@/types/forms";


// offset = 0 -> current question card
// offset < 0 -> Question cards that are already answered
// offset > 0 -> Question cards that are not answered
interface StackedCardContainerProps {
    cardArrangement: string;
    currentQuestionId: string;
    form: TForm,
    getCardContent: (questionIdx: number, offset: number) => JSX.Element | undefined;
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
    const highlightBorderColor = "white";
    const cardBorderColor = "white";
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
            setVisitedQuestionIdx((prev) => {
                return [...prev, questionIdxTemp];
            });
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
    }, [questionIdxTemp, currentQuestionIdx, visitedQuestionIdx]);

    const borderStyles = useMemo(() => {
        const baseStyle = {
            border: "1px solid",
            borderRadius: "8px",
        }
        const borderColor = !highlightBorderColor ? cardBorderColor : highlightBorderColor;
        return {
            ...baseStyle,
            borderColor: borderColor,
        }
    }, [cardBorderColor, highlightBorderColor]);

    const calculateCardTransform = useMemo(() => {
        const rotationCoefficient = cardWidth >= 1000 ? 1.5 : cardWidth > 650 ? 2 : 3;
        return (offset: number) => {
            switch(cardArrangement) {
                case "casual":
                    return offset < 0
                    ? `translateX(33%)`
                    : `translateX(0) rotate(-${(hovered ? rotationCoefficient : rotationCoefficient - 0.5) * offset}deg)`;
                case "straight":
                    return offset < 0 ? `translateY(25%)` : `translateY(-${(hovered ? 12 : 10) * offset}px)`;
                default:
                    return offset < 0 ? `translateX(0)` : `translateX(0)`;
            }
        };
    }, [cardArrangement, cardWidth, hovered]);

    const straightCardArrangementStyles = (offset: number) => {
        if (cardArrangement === "straight") {
        // styles to set the descending width of stacked question cards when card arrangement is set to straight
        return {
            width: `${100 - 5 * offset >= 100 ? 100 : 100 - 5 * offset}%`,
            margin: "auto",
        };
        }
    };

    // UseEffect to handle the resize of current question card and set card height accordingly
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentElement = cardRefs.current[questionIdxTemp];
            if (currentElement) {
                if (resizeObserver) {
                    resizeObserver.current?.disconnect();
                }
                resizeObserver.current = new ResizeObserver((entries) => {
                    for (const entry of entries) {
                        setCardHeight(entry.contentRect.height + "px");
                        setCardWidth(entry.contentRect.width);
                    }
                });
                resizeObserver.current?.observe(currentElement);
            }
        }, 0);
        return () => {
            resizeObserver.current?.disconnect();
            clearTimeout(timer);
        }
    }, [questionIdxTemp, cardRefs, cardArrangement]);

    // Reset question progress, when card arrangement changes
    useEffect(() => {
        setQuestionId(form.welcomeCard.enabled ? "start" : form?.questions[0]?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardArrangement])

    const getCardHeight = (offset: number): string => {
        // Take default height depending upon card content
        if (offset === 0) return 'auto';
        // preserver original height
        else if (offset < 0) return "initial";
        // Assign the height of the foremost card to all card behids it
        else return cardHeight;
    };

    return (
        <div 
            className="relative flex h-full items-end justify-center md:items-center"
            onMouseEnter={() => { setHovered(true) }}
            onMouseLeave={() => { setHovered(false) }}>
            <div style={{ height: cardHeight }}>
            {cardArrangement === "simple" ? (
                <div 
                    className="w-full"
                    style={{
                        ...borderStyles
                    }}    
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
                                    transform: `${calculateCardTransform(offset)}`,
                                    opacity: isHidden ? 0 : (100 - 0 * offset / 10),
                                    height: getCardHeight(offset),
                                    transitionDuration: "600ms",
                                    pointerEvents: offset === 0 ? "auto" : "none",
                                    ...borderStyles,
                                    ...straightCardArrangementStyles(offset),
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