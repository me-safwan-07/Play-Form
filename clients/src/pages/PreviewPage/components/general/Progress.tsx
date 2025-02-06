export const Progress = ({progress}: {progress?: number}) => {
    return (
        <div className="bg-slate-200 h-2 w-full overflow-hidden rounded-full">
            <div 
                className="transition-width bg-slate-500 z-20 h-2 rounded-full duration-500"
                style={{
                    width: `${20}%`
                }}
            ></div>
        </div>
    )
}