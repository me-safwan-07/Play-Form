import { TForm } from "@/types/forms";
import { useMemo, useEffect, useRef, useState } from "react";
import { WelcomeCard } from "./WelcomeCard";
import StackedCardContainer from "../wrappers/StackedCardContainer";
import { cn } from "@/lib/utils";
import { ProgressBar } from "./ProgressBar";
import { QuestionConditional } from "./QuestionConditional";

export const Form = ({ form, getSetQuestionId }: { form: TForm, getSetQuestionId: (setId: string) => void }) => {
    if (!form || !form.questions) {
        console.error('Form is not defined or questions are missing');
        return <div>Error: Form data is missing.</div>; // Fallback UI
    }

    const [questionId, setQuestionId] = useState(() => {
        if (form.welcomeCard.enabled) {
            return "start";
        }
        return form.questions[0].id;
    });
    const [showError, setShowError] = useState(false);
    const [loadingElement, setLoadingElement] = useState(false);
    const [history, setHistory] = useState<string[]>([]);

    const currentQuestionIndex = form.questions.findIndex((q) => q.id === questionId);
    const currentQuestion = useMemo(() => {
        if (questionId === "end" && !form.thankYouCard.enabled) {
            const newHistory = [...history];
            const prevQuestionId = newHistory.pop();
            return form.questions.find((q) => q.id === prevQuestionId);
        } else {
            return form.questions.find((q) => q.id === questionId);
        }
    }, [questionId, history, form]);

    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [questionId]);

    useEffect(() => {
        if (getSetQuestionId) {
            getSetQuestionId(questionId);
        }
    }, [getSetQuestionId, questionId]);

    const getNextQuestionId = () => {
        const question = form.questions;

        if (questionId === "start") return question[0]?.id || "end";

        return question[currentQuestionIndex + 1]?.id || "end";
    }

    const onSubmit = (reponseData: Record<string, string>) => {
        const questionId = Object.keys(reponseData)[0];
        setLoadingElement(true);
        const nextQuestionId = getNextQuestionId();
        const finished = nextQuestionId === "end";
        setQuestionId(nextQuestionId)
        setHistory([...history, questionId]);
        setLoadingElement(false);
    }

    const getCardContent = (questionIdx: number, offset: number): JSX.Element | undefined => {
        if (showError) {
            return <div>Error</div>;
        }

        const content = () => {
            if (questionIdx === -1) {
                return (
                    <WelcomeCard
                        key="start"
                        headline={form.welcomeCard.headline}
                        onSumit={onSubmit}          
                        form={form}
                        isCurrent={offset === 0}
                    />
                )
            } else {
                const question = form.questions[questionIdx];
                return (
                    question && (
                        <QuestionConditional
                            key={question.id}
                            formId={form.id}
                            question={question}
                            currentQuestionId={questionId}
                            isFirstQuestion={question.id === form?.questions[0]?.id}
                            isLastQuestion={question.id === form?.questions[form?.questions.length - 1]?.id}
                        />
                    )
                )   
            }
        }
        return (
            <div 
                className={cn(
                    "no-scrollbar md:rounded-custom rounded-t-custom bg-survey-bg flex h-full w-full flex-col justify-between overflow-hidden transition-all duration-1000 ease-in-out"
                )}>
                <div 
                    ref={contentRef}
                    className={cn(
                        loadingElement ? "animate-pulse opacity-60" : ""
                    )}>
                    {content()}
                </div>
                {/* <div className="mx-6 mb-10 mt-2 space-y-3 md:mb-6 md:mt-6">
                    <ProgressBar
                        form={form}
                        questionId={questionId}
                    />
                </div> */}
            </div>
        )
    }

    return (
        <>
            <StackedCardContainer 
                cardArrangement="straight"
                currentQuestionId={questionId}
                getCardContent={getCardContent}
                form={form}
                setQuestionId={setQuestionId}
            />
        </>
    )
}