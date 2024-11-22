import { cn } from "@/lib/utils";
import { ArrowUpFromLineIcon } from "lucide-react"

interface UploaderProps {
    id: string;
    name: string;
    multiple: boolean;
}

export const Uploader = (
    // id,
    // name,
    // multiple,

) => {

    return (
        <label
            className={cn(
                "relative flex cursor-pointer flex-col items-center justify-center"
            )}
        >
            <div className="flex flex-col item-center justify-center pb-6 pt-5">
                <ArrowUpFromLineIcon className="h-6 text-slate-500" />
                <p className={cn(
                    "mt-2 text-center text-sm text-slate-500"
                )}>
                    <span className="font-semibold">Click or drag to upload files.</span>
                </p>
                <input 
                    type="file"
                    // id={`${id}-${name}`}
                    // name={`${id}-${name}`}
                    // multiple={multiple}
                    onChange={(e) => e}
                    className="hidden"
                />
            </div>
        </label>
    )
}