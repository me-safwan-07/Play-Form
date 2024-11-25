// import { Label } from "@radix-ui/react-dropdown-menu"

import { ImagePlusIcon, TrashIcon } from "lucide-react";
import { FileInput } from "../FileInput";
import { Label } from "../Label";
import { Input } from "../Input";

interface QuestionFormInputProps {
    id: string;
    label: string;
    isInvalid: boolean;
    maxLength?: number;
    placeholder?: string;
    className?: string;
}

export const QuestionFormInput = ({
    id,
    label,
    // isInvalid,
    // maxLength,
    placeholder,
    className,
 }: QuestionFormInputProps
) => {

    return (
        <div className="w-full">
            <div className="w-full">
                <div className="mb-2 mt-3">
                    {/* <Label>{label}</Label> */}
                    <Label htmlFor={id}>{label}</Label>
                </div>

                <div className="flex flex-col gap-4 bg-white">
                    {id === "file" && (
                        <FileInput 
                            // id="question-image"

                        />
                    )}
                    <div className="flex items-center space-x-2">
                        <div className="group relative w-full">
                            <div className="h-10 w-full"></div>
                            <div className="">
                                
                            </div>
                            {/* here the edit recall button arrive */}

                            <Input
                                dir="auto"
                                className={`absolute top-0 text-black caret-black ${className}`}
                                placeholder={placeholder}
                                id={id}
                                name={id}
                                aria-label={label}
                                autoComplete="on"
                            />
                        </div>
                        {id === "headline" && (
                            <ImagePlusIcon 
                                aria-label="Toggle image uploader"
                                className="ml-2 h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-500"
                            />
                        )}
                        {id === "subheader" && (
                            <TrashIcon 
                                className="ml-2 h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-500"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}