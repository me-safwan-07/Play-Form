import { TFormQuestion } from "@/types/forms"
import { TProduct } from "@/types/products"
import { structuredClone } from "./pollyfills/structuredClone";
import { TTemplate } from "@/types/templates";

export const customForm = {
    name: "Start from scratch",
    description: "Create a form without template."
}

export const replaceQuestionPresetPlaceholders = (
  question: TFormQuestion,
  product: TProduct
): TFormQuestion => {
  if (!product) return question;
  const newQuestion = structuredClone(question);

  // Replace placeholders in the headline
  if (newQuestion.headline) {
    newQuestion.headline = newQuestion.headline.replace("{{productName}}", product.name);
  }

  // Replace placeholders in the subheader
  if (newQuestion.subheader) {
    newQuestion.subheader = newQuestion.subheader.replace("{{productName}}", product.name);
  }

  return newQuestion;
};

// Replace all occurrences of productName with the actual product name in the current template
export const replacePresetPlaceholders = (template: TTemplate, product: TProduct) => {
  const preset = structuredClone(template.preset);

  // Replace placeholders in the preset name
  preset.name = preset.name.replace("{{productName}}", product.name);

  // Replace placeholders in each question
  preset.questions = preset.questions.map((question) => {
    return replaceQuestionPresetPlaceholders(question, product);
  });

  return { ...template, preset };
};
