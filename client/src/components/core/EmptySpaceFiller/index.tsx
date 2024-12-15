import { Skeleton } from "@/components/ui/Skeleton";

type EmptySpaceFillerProps = {
  type: "table" | "response" | "event" | "linkResponse" | "tag" | "summary";
//   environment: TEnvironment;
//   noWidgetRequired?: boolean;
//   emptyMessage?: string;
//   widgetSetupCompleted?: boolean;
};
export const EmptySpaceFiller = ({
    type,
}: EmptySpaceFillerProps) => {

    if (type === "response") {
      return (
        <div className="group space-y-4 rounded-lg bg-white p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-slate-100"></div>
            <div className="h-6 w-full rounded-full bg-slate-100"></div>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-full rounded-full bg-slate-100"></div>
            <div className="flex h-12 w-full items-center justify-center rounded-full bg-slate-50 text-sm text-slate-500 hover:bg-slate-100">
              {/* {!widgetSetupCompleted && !noWidgetRequired && (
                <Link
                  className="flex h-full w-full items-center justify-center"
                  href={`/environments/${environment.id}/product/app-connection`}>
                  <span className="decoration-brand-dark underline transition-all duration-300 ease-in-out">
                    Install Formbricks Widget. <strong>Go to Setup Checklist 👉</strong>
                  </span>
                </Link>
              )}
              {(widgetSetupCompleted || noWidgetRequired) && ( */}
                <span className="bg-light-background-primary-500 text-center">
                  {"Waiting for a response"} 🧘‍♂️
                </span>
              {/* )} */}
            </div>
            <div className="h-12 w-full rounded-full bg-slate-50/50"></div>
          </div>
        </div>
      );
    }

    if (type === "summary") {
        return (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <Skeleton className="group space-y-4 rounded-lg bg-white p-6">
                <div className="flex items-center space-x-4">
                    <div className="h-6 w-full rounded-full bg-slate-100"></div>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-4">
                    <div className="h-6 w-24 rounded-full bg-slate-100"></div>
                    <div className="h-6 w-24 rounded-full bg-slate-100"></div>
                    </div>
                    <div className="flex h-12 w-full items-center justify-center rounded-full bg-slate-50 text-sm text-slate-500 hover:bg-slate-100"></div>
                    <div className="h-12 w-full rounded-full bg-slate-50/50"></div>
                </div>
                </Skeleton>
            </div>
        )
    }
} 