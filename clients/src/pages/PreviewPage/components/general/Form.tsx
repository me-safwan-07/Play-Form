import { cn } from '@/lib/utils';
import { TForm } from '@/types/forms';
import React, { useRef, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { Headline } from './Headline';
import { Progress } from './Progress';
import { Subheader } from './Subheader';
import { OpenTextQuestion } from '../questions/OpenTextQuestion';
import { ScrollableContainer } from '../wrappers/ScrollableContainer';

// fb-bg-survey-bg: white
// survey-shadow: form-shadow (index.css)
interface FormProps {
    form: TForm,
}

function Form({
    form
}: FormProps) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [loadingElement, setLoadingElement] = useState(false);

    const getCardContent = (questionIdx: number, offset: number): JSX.Element | undefined => {
        const question = form.questions[questionIdx];
        if (!question) return undefined;

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
                    {/* <ScrollableContainer> */}

                    <OpenTextQuestion
                        key={question.id}
                        question={question}
                        currentQuestionId={question.id}
                        isFirstQuestion={questionIdx === 0}
                        />
                    {/* </ScrollableContainer> */}

                </div>
                <div className="mx-6 mb-10 mt-2 space-y-3 md:mb-6 md:mt-6">
                    {/* <ProgressBar form={form} questionId={question.id} /> */}
                    <Progress progress={0.5} />
                </div>
            </div>
        )
    }

  return (
    <div>
        {getCardContent(1, 0)}
    </div>
  )
}

export default Form
