import { cn } from "@/lib/utils";

interface PageContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContentWrapper = ({ children, className }: PageContentWrapperProps) => {
  return <div className={cn("h-full space-y-2 md:space-y-4 p-2 md:p-6", className)}>{children}</div>;
};
