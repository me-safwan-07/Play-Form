import { SubmitButton } from "../buttons/SubmitButton"

export const ResponseErrorComponent = () => {
    return (
       <div className="">
            <span className="">
                {"Your feedback is stuck: ("}
            </span>
            <p className="">
                The servers cannot be reached at the moment.
                <br />
                Please retry now or try again later.
            </p>
            <div className="">
                <div className="">
                    <SubmitButton 
                        tabIndex={2}
                        buttonLabel="Retry"
                        isLastQuestion={false}
                        // onClick={}
                    />
                </div>
            </div>
       </div> 
    )
}