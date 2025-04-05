"use client";

import { DndContext } from "@dnd-kit/core";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/Label";
// import { Input } from "@/components/ui/Input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { QuestionFormInput } from "@/components/ui/QuestionFormInput";
import { TForm } from "@/types/forms";
import { Button } from "@/components/ui/Button";

interface MultipleChoiceQuestionFormProps {
  localForm: TForm;
}
export const MultipleChoiceQuestionForm = ({
  localForm
}: MultipleChoiceQuestionFormProps) => {
  // const lastChoiceRef = useRef<HTMLInputElement>(null);
  // const questionRef = useRef<HTMLInputElement>(null);

  // const [isNew, setIsNew] = useState(true);
  // const [choices, setChoices] = useState<string[]>(["Option 1", "Option 2"]);
  const [subheader, setSubheader] = useState<string | null>(null);
  // const [isMultiple, setIsMultiple] = useState(false);

  // const addChoice = () => {
  //   setChoices([...choices, `Option ${choices.length + 1}`]);
  // };

  // const deleteChoice = (index: number) => {
  //   setChoices(choices.filter((_, idx) => idx !== index));
  // };

  // const updateChoice = (index: number, value: string) => {
  //   const updatedChoices = [...choices];
  //   updatedChoices[index] = value;
  //   setChoices(updatedChoices);
  // };

  // useEffect(() => {
  //   if (lastChoiceRef.current) {
  //     lastChoiceRef.current.focus();
  //   }
  // }, [choices.length]);

  // useEffect(() => {
  //   if (isNew && questionRef.current) {
  //     questionRef.current.focus();
  //   }
  // }, [isNew]);

  return (
    <form>
        <QuestionFormInput 
            id="headline"
            label="Headline"
            isInvalid={false}
            value={localForm.name || ""} // change the value localform variable
            localForm={localForm}
            questionIdx={0}
        />

        <div>
            {subheader !== null ? (
            // <div>
            //     <Label htmlFor="subheader" className="mb-2 text-lg font-medium">
            //         Description
            //     </Label>
            //     <Input
            //     id="subheader"
            //     placeholder="Add a subheader/description"
            //     value={subheader}
            //     onChange={(e) => setSubheader(e.target.value)}
            //     />
            // </div>
                <div className="inline-flex w-full items-center">
                    <div className="w-full">
                        <QuestionFormInput 
                            id="subheader"
                            label="Description"
                            isInvalid={false}
                            value={subheader || ""}
                            localForm={localForm}
                            questionIdx={0}
                        />
                    </div>
                </div>
            ) : (
            <Button
                // variant="minimal"
                size="sm"
                className="mt-3"
                onClick={() => setSubheader("")}
            >
                <PlusIcon className="mr-1 h-4 w-4" />
                Add Description
            </Button>
            )}
        </div>

        <div>
            <Label htmlFor="choices"> Options* </Label>
            <div className="mt-2" id="choices">
                <DndContext>
                    {/* <SortableContext items={""}>
                        <div className="">
                            
                        </div>
                    </SortableContext> */}
                </DndContext>
            </div>
        </div>
    </form>
  );
};

// export default MultipleChoiceQuestionForm;
