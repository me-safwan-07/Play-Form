import React, { useState } from 'react';

// export const initialFilters: 

export const FormList: React.FC = (): JSX.Element => {
    // const [forms, setForms] = useState<>([]);
    return (
        <div className="">
            <div className="flex-col space-y-3">
                <div className="mt-6 grid w-full grid-cols-8 place-items-center gap-3 px-6 pr-8 text-sm text-slate-800">
                    <div className="col-span-2 place-self-start">Name</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1">Responses</div>
                    {/* <div className="col-span-1">Type</div> */}
                    <div className="col-span-1">Created at</div>
                    <div className="col-span-1">Updated at</div>
                    <div className="col-span-1">Created by</div>
                </div>
            </div>
        </div>
    );
};
