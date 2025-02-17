import { cn } from '@/lib/utils';
import { TForm } from '@/types/forms';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { TResponseData } from '@/types/responses';
import { WelcomeCard } from './WelcomeCard';
import { forms } from '@/lib/api';
import { QuestionConditional } from './QuestionConditional';
import StackedCardContainer from '../wrappers/StackedCardContainer';
import { ResponseErrorComponent } from './ResponseErrorComponent';

// fb-bg-survey-bg: white
// survey-shadow: form-shadow (index.css)
interface FormProps {
    form: TForm,
    getSetQuestionId?: string | null;
}

function Form({
    form,
    getSetQuestionId,
}: FormProps) {
    const [questionId, setQuestionId] = useState(() => {
        if (getSetQuestionId) {
            return getSetQuestionId;
        } else if (form.welcomeCard.enabled) {
            return "start";
        } else {
            return form.questions[0]?.id;
        }
    });
    const [showError, setShowError] = useState(false);

    const [isResponseSendingFinished, setIsResponseSendingFinished] = useState(false);
    const [loadingElement, setLoadingElement] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [responseData, setResponseData] = useState<TResponseData>({});
    const [cardArrangement, setcardArrangement] = useState("simple"); // TODO if styling.cardArrangement
    const currentQuestionIndex = form?.questions ? form.questions.findIndex((q) => q.id === questionId): -1;
    const currentQuestion = useMemo(() => {
       if (questionId === "end" && !form.thankYouCard.enabled) {
        const newHistory = [...history];
        const prevQuestionId = newHistory.pop();
        return form?.questions.find((q) => q.id === prevQuestionId);
       } else {
        return form.questions.find((q) => q.id === questionId);
       }
    }, [questionId, form, history]);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const currentQuestionId = questionId;
    // const showProgressBar = !styling.hideProgressBar;

    useEffect(() => {
        // scroll to top when question changes
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [questionId]);


    useEffect(() => {
        console.log(responseData);
    }, [responseData]);

    let currIdxTemp = currentQuestionIndex;
    let currQuesTemp = currentQuestion;

    const getNextQuestionId = (): string => {
        const questions = form.questions;
        // const responseValue = data[questionId];
    
        if (questionId === "start") return questions[0]?.id || "end";

        if (currIdxTemp === -1) throw new Error("Question not found");
        // if(currentQuestion) {
        //     setResponseData({ ...responseData, responseValue });
        // }

        return questions[currIdxTemp + 1]?.id || 'end';
    };

    const onChange = (responseDataUpdate: TResponseData) => {
        const updatedResponseData = { ...responseData, ...responseDataUpdate };
        setResponseData(updatedResponseData);
    }

    const onSubmit = () => {
        const questionId = getNextQuestionId;
        setLoadingElement(true);
        const nextQuestionId = getNextQuestionId();
        const finished = nextQuestionId === 'end';
        onChange(responseData);
        // if (finished) {
        //     window.parent.postMessage("playformcompleted", "*");
        // }
        setQuestionId(nextQuestionId);
        setHistory([...history, questionId]);
        setLoadingElement(false);
    };

    const onBack = (): void => {
        let prevQuestionId;
        // use history if available
        if(history?.length > 0) {
            const newHistory = [...history];
            prevQuestionId = newHistory.pop();
            setHistory(newHistory);
        } else {
            prevQuestionId = form.questions[currIdxTemp - 1]?.id;
        }
        if (!prevQuestionId) throw new Error("Question not found");
        setQuestionId(prevQuestionId);
    };

    
    const getCardContent = (questionIdx: number, offset: number): JSX.Element | undefined => {
        if (showError) {
            return (
                // not completed yet
                <ResponseErrorComponent />
            )
        }
        const content = () => {
            if (questionIdx === -1) {
                return (
                    <WelcomeCard 
                        key="start"
                        headline={form.welcomeCard.headline}
                        onSubmit={onSubmit}
                        form={form}
                        isCurrent={offset === 0}
                    />
                );
            } else {
                const question = form.questions[questionIdx];
                return (
                    question && (
                        <QuestionConditional 
                            key={question.id}
                            formId={form.id}
                            question={question}
                            value={responseData[question.id]}
                            onChange={onChange}
                            onSubmit={onSubmit}
                            onBack={onBack}
                            isFirstQuestion={question.id === form?.questions[0]?.id}
                            isLastQuestion={question.id === form.questions[form.questions.length - 1].id}
                            currentQuestionId={questionId}
                        />
                    )
                )
            }
        };
            
        return (
            <div className="h-full w-full">
                <div
                    className={cn(
                        "no-scrollbar md:rounded-lg bg-white flex h-full w-full flex-col justify-between overflow-hidden transition-all duration-1000 ease-in-out form-shadow ",
                        cardArrangement === "simple" ? "form-shadow" : "",
                        offset === 0 ? "opacity-100" : "opacity-0"
                    )}
                    >
                    <div
                        ref={contentRef}
                        className={cn(
                            loadingElement ? 'animate-pulse opacity-60' : ''
                        )}
                        >
                        {content()}
                    </div>
                    <div className="mx-6 mb-10 mt-2 space-y-3 md:mb-6 md:mt-6">
                        {/* <ProgressBar form={form} questionId={questionId} /> */}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {/* {getCardContent(currIdxTemp, 0)} */}
            <StackedCardContainer 
                cardArrangement={cardArrangement}
                currentQuestionId={questionId}
                getCardContent={getCardContent}
                form={form}
                setQuestionId={setQuestionId}
            />
        </div>
    )
}

export default Form
