import { cn } from '@/lib/utils';
import { TForm } from '@/types/forms';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TResponseData } from '@/types/responses';
import { WelcomeCard } from './WelcomeCard';
import { QuestionConditional } from './QuestionConditional';
import StackedCardContainer from '../wrappers/StackedCardContainer';
import { ResponseErrorComponent } from './ResponseErrorComponent';
import { PlayFormBranding } from './PlayFormBranding';

// fb-bg-survey-bg: white
// survey-shadow: form-shadow (index.css)
interface FormProps {
    form: TForm,
    autoFocus?: boolean;
    onDisplay?: () => void;
    getSetIsError?: (getSetError: (value: boolean) => void) => void;
    getSetIsResponseSendingFinished?: (getSetIsResponseSendingFinished: (value: boolean) => void) => void;
    getSetQuestionId?: ((setState: (value: string) => void) => void) | null,
}

function Form({
    form,
    getSetQuestionId,
    // autoFocus = false,
    onDisplay = () => {},
    getSetIsError,
    getSetIsResponseSendingFinished
}: FormProps) {
    // const autoFocusEnabled = autoFocus !== undefined ? autoFocus : window.self === window.top;

    const [questionId, setQuestionId] = useState(() => {
        if (form.welcomeCard.enabled) {
            return "start";
        } else {
            return form.questions[0]?.id;
        }
    });
    const [showError, setShowError] = useState(false);
    // flag state to store whether response processing has been completed or not, we ignore  this check for form editor preview and link form preview where getSetIsResponseSendingFinished is undefined
    // const [isResponseSendingFinished, setIsResponseSendingFinished] = useState(
    //     getSetIsResponseSendingFinished ? false : true
    // );
    const [loadingElement, setLoadingElement] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [responseData, setResponseData] = useState<TResponseData>({});
    const [cardArrangement, setcardArrangement] = useState("straight"); // TODO if styling.cardArrangement
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
        // call onDisplay when component is mounted
        onDisplay();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (getSetIsError) {
            getSetIsError((value: boolean) => {
                setShowError(value);
            });
        }
    }, [getSetIsError]);

    useEffect(() => {
        if (getSetQuestionId) {
          getSetQuestionId((value: string) => {
            setQuestionId(value);
          });
        }
    }, [getSetQuestionId]);

    useEffect(() => {
        if (getSetIsResponseSendingFinished) {
            getSetIsResponseSendingFinished((value: boolean) => {
                setIsResponseSendingFinished(value);
            });
        }
    }, [getSetIsResponseSendingFinished]);

    const currIdxTemp = currentQuestionIndex;
    const currQuesTemp = currentQuestion;

    const getNextQuestionId = (): string => {
        const questions = form.questions;
        
        if (questionId === "start") return questions[0]?.id || "end";
    
        if (currIdxTemp === -1) throw new Error("Question not found");
    
        return questions[currIdxTemp + 1]?.id || 'end';
    };

    const onChange = (responseDataUpdate: TResponseData) => {
        const updatedResponseData = { ...responseData, ...responseDataUpdate };
        setResponseData(updatedResponseData);
    }

    const onSubmit = () => {
        const nextQuestionId = getNextQuestionId();
        setLoadingElement(true);
    
        // Save the response data before moving to the next question
        onChange(responseData);
    
        if (nextQuestionId === "end") {
            // Show a confirmation popup before leaving
            const userConfirmed = window.confirm("You have reached the end of the form. Do you want to submit?");
            if (!userConfirmed) {
                setLoadingElement(false);
                return;
            }
            window.parent.postMessage("playformcompleted", "*");
        } else {
            // Move to the next question
            setHistory([...history, questionId]); // Track history
            setQuestionId(nextQuestionId);
        }
    
        setLoadingElement(false);
    };

    const onBack = (): void => {
        if (history.length === 0) {
            alert("You are at the first question.");
            return;
        }
    
        const newHistory = [...history];
        const prevQuestionId = newHistory.pop();
        setHistory(newHistory);
        setQuestionId(prevQuestionId || form.questions[0]?.id);
    };

    // useEffect(() => {
    //     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //         event.preventDefault();
    //         event.returnValue = "Are you sure you want to leave? Your progress will be lost.";
    //     };
        
    //     window.addEventListener("beforeunload", handleBeforeUnload);
        
    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);
    
    const getCardContent = (questionIdx: number, offset: number): JSX.Element | undefined => {
        if (showError) {
            return (
                <ResponseErrorComponent 
                    responseData={responseData}
                    question={form.questions}
                    onRetry={() => {}} // TODO - add the onRetry props or functions
                />
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
                        cardArrangement === "simple" ? "pf-form-shadow" : "",
                        offset === 0 ? "opacity-100" : "opacity-0"
                    )}
                    >
                    <div
                        ref={contentRef}
                        className={cn(
                            loadingElement ? 'animate-pulse opacity-60' : ''
                            ,"my-auto"
                        )}
                        >
                        {content()}
                    </div>
                    <div className="mx-6 mb-10 mt-2 space-y-3 md:mb-6 md:mt-6">
                        <PlayFormBranding />
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
