import { TAllowedFileExtension } from "@/types/common";
import { Uploader } from "./components/Uploader";
import { useState } from "react";

interface FileInputProps {
  allowedFileExtensions: TAllowedFileExtension[];
  formId: string | undefined;
  fileUrls: string[] | undefined;
  htmlFor?: string
}

const allowedFileTypesForPreview = ["png", "jpeg", "jpg", "webp"];

const tabs = [
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
];

export const FileInput = ({
  allowedFileExtensions,
  formId,
  fileUrls,
  htmlFor = "",
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

    return (
        <div className="fb-items-left fb-bg-input-bg hover:fb-bg-input-bg-selected fb-border-border fb-relative fb-mt-3 fb-flex fb-w-full fb-flex-col fb-justify-center fb-rounded-lg fb-border-2 fb-border-dashed dark:fb-border-slate-600 dark:fb-bg-slate-700 dark:hover:fb-border-slate-500 dark:hover:fb-bg-slate-800">
            <div className="flex flex-wrap gap-2">
                <Uploader 
                     
                />
            </div>
        </div>
    )
}