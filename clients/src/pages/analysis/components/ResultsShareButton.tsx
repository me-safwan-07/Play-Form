import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { CopyIcon, GlobeIcon, LinkIcon } from "lucide-react"
import toast from "react-hot-toast"

export const ResultsShareButton = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    className="focus:bg-muted cursor-pointer border border-slate-200 outline-none hover:border-slate-300">
                    <div className="min-w-auto h-auto rounded-md border bg-white p-3 sm:flex sm:min-w-[7rem] sm:px-6 sm:py-3">
                        <div className="hidden w-full items-center justify-between sm:flex">
                            <span className="text-sm text-slate-700">Share results</span>
                            <LinkIcon className="ml-2 h-4 w-4" />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem
                        className="hover:ring-0"
                        onClick={() => {
                            toast.success("Link to public results copied");
                        }}
                    >
                        <p className="flex items-center text-slate-700">
                            Copy link <CopyIcon className="ml-1.5 inline h-4 w-4" />
                        </p>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="hover:ring-0">
                        <p className="flex items-center text-slate-700">
                            Publish to web
                            <GlobeIcon className="ml-1.5 h-4 w-4"/>
                        </p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}