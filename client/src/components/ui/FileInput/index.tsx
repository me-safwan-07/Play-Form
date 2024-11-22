import { Uploader } from "./components/Uploader";

const allowedFileTypesForPreview = ["png", "jpeg", "jpg", "webp"];

const tabs = [
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
];

interface SelectedFile {
  url: string;
  name: string;
  uploaded: Boolean;
}

export const FileInput = () => {

    return (
        <div className="w-full cursor-default">
            <div className="flex flex-wrap gap-2">
                <Uploader 
                     
                />
            </div>
        </div>
    )
}