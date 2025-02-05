export const Progress = ({progress}: {progress: number}) => {
    return (
        <div className="">
            <div 
                className=""
                style={{
                    width: `${Math.floor(progress * 100 )}%`
                }}
            ></div>
        </div>
    )
}