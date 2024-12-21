import { cn } from "@/lib/utils";
import { TFormEditorTabs } from "@/types/forms";
import { PaintbrushIcon, Rows3Icon, SettingsIcon } from "lucide-react";
import { useMemo } from "react";

interface Tab {
  id: TFormEditorTabs;
  label: string;
  icon: JSX.Element;
}

const tabs: Tab[] = [
  {
    id: "questions",
    label: "Questions",
    icon: <Rows3Icon className="h-5 w-5" />,
  },
  {
    id: "styling",
    label: "Styling",
    icon: <PaintbrushIcon />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon className="h-5 w-5" />,
  },
];

interface QuestionsAudienceTabsProps {
    activeId: TFormEditorTabs;
    setActiveId: React.Dispatch<React.SetStateAction<TFormEditorTabs>>;
    isStylingTabVisible: boolean; // Add this prop to your component and pass it down to its child components. This will help determine which tab should be visible.  // Add this prop to your component and pass it down to its child components. This will help determine which tab should be visible.  // Add this prop to your component and pass it down to its child components. This will help determine which tab should be visible.  // Add this prop to your component and pass it down to its child components. This will help determine which tab should be visible.  // Add this prop to your component and pass it down to its child components. This will help determine which tab should be visible.  // Add this prop to your component and pass it down to its child components. This will help determine which tab should be visible.  // Add this prop to your component and pass it down to its child components. This will help determine which tab should be visible.  // Add
}
export const QuestionsAudienceTabs = ({
    activeId,
    setActiveId,
    isStylingTabVisible
}: QuestionsAudienceTabsProps) => {
    const tabsComputed = useMemo(() => {
        if (isStylingTabVisible) {
          return tabs;
        }
        return tabs.filter((tab) => tab.id !== "styling");
      }, [isStylingTabVisible]);
    return (
        <div className="fixed z-30 flex h-14 w-full items-center justify-center border bg-white md:w-1/2">
            <nav className="flex h-full items-center space-x-4" aria-label="Tabs">
                {tabsComputed.map((tab) => (
                    <button
                        type="button" 
                        key={tab.id}
                        onClick={() => setActiveId(tab.id)}
                        className={cn(
                            tab.id === activeId 
                                ? "border-brand-dark border-b-2 font-semibold text-slate-900"
                                : "text-slate-500 hover:text-slate-700",
                            "text-slate-500 hoverflex h-full items-center px-3 text-sm font-medium"
                        )}
                    >
                        {tab.icon && <div className="mr-2 h-5 w-5">{tab.icon}</div>} 
                        {tab.label}   
                    </button>
                ))}
            </nav>
        </div>
    )
}