import { cn } from '@/lib/utils';
import { TForm } from '@/types/forms';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { TResponseData, TResponseDataValue } from '@/types/responses';
import { WelcomeCard } from './WelcomeCard';
import { forms } from '@/lib/api';
import { QuestionConditional } from './QuestionConditional';

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
    const [questionId, setQuestionId] = useState("");

    useEffect(() => {
        if (getSetQuestionId) {
            setQuestionId(getSetQuestionId);
        } else if (form.welcomeCard.enabled) {
            setQuestionId("start");
        } else {
            setQuestionId(form?.questions[0]?.id);
        }
        // console.log("questionId", questionId);
        // console.log("getsetQuestionID", getSetQuestionId);
    }, [getSetQuestionId]);

    useEffect(() => {
        console.log("single mount");
        console.log("form", form);
        console.log("getSetQuestion", getSetQuestionId);
    }, []);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const [loadingElement, setLoadingElement] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [responseData, setResponseData] = useState<TResponseData>({});
    
    const currentQuestionId = questionId;

    const cardArrangement = "straight";

    const currentQuestionIndex = form.questions.findIndex((q) => q.id === questionId);

    useEffect(() => {
        console.log("index", currentQuestionIndex);
    }, [questionId, forms, getSetQuestionId])
    const currentQuestion = useMemo(() => {
      if (questionId === "end" && !form.thankYouCard.enabled) {
        const newHistory = [...history];
        const prevQuestionId = newHistory.pop();
        return form.questions.find((q) => q.id === questionId);
      }  
    }, [questionId, form, history]);

    useEffect(() => {
        // scroll to top when question changes
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [questionId]);

    let currIdxTemp = currentQuestionIndex;
    let currQuesTemp = currentQuestion;

    const getNextQuestionId = (data: TResponseData): string => {
        const questions = form.questions;

        if (questionId === "start") return questions[0]?.id || "end";

        if (currIdxTemp === -1) throw new Error("Question not found");

        return questions[currIdxTemp + 1]?.id || 'end';
    };

    const onChange = (responseDataUpdate: TResponseData) => {
        const updatedResponseData = { ...responseData, ...responseDataUpdate };
        setResponseData(updatedResponseData);
    }

    const onSubmit = (responseData: TResponseData) => {
        const questionId = Object.keys(responseData)[0];
        setLoadingElement(true);
        const nextQuestionId = getNextQuestionId(responseData);
        onChange(responseData);
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
    }

    const getCardContent = (questionIdx: number, offset: number): JSX.Element | undefined => {
        const question = form.questions[questionIdx];
        if (!question) return undefined;

        // if (form.welcomeCard.enabled) {
        //     questionIdx = 0
        // }

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
                return (
                    // <OpenTextQuestion
                    //     key={question.id}
                    //     question={question}
                    //     currentQuestionId={question.id}
                    //     isFirstQuestion={questionIdx === 0}
                    //     onSubmit={onSubmit}
                    // />
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
                );
            }
        }

        return (
            <div
                className={cn(
                    "no-scrollbar md:rounded-lg bg-white flex h-full w-full flex-col justify-between overflow-hidden transition-all duration-1000 ease-in-out form-shadow ",
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
                    <ProgressBar form={form} questionId={question.id} />
                </div>
            </div>
        )
    }

  return (
    <div>
        {getCardContent(currIdxTemp, 0)}
    </div>
  )
}

export default Form
