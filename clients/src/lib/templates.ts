import { TFormOpenTextQuestion, TFormQuestion, TFormQuestionTypeEnum, TFormThankYouCard, TFormWelcomeCard } from "@/types/forms"
import { TProduct } from "@/types/products"
import { structuredClone } from "./pollyfills/structuredClone";
import { TTemplate } from "@/types/templates";
import { createId } from "@paralleldrive/cuid2";


export const thankYouCardDefault: TFormThankYouCard = {
  enabled: true,
  headline: { default: "Thank you!" },
  subheader: { default: "We appreciate your feedback." },
  buttonLabel: { default: "Create your own form" },
  buttonLink: "http://localhost:5173/signup"
};

const welcomeCardDefault: TFormWelcomeCard = {
  enabled: false,
  headline: { default: "Welcome!" },
  html: { default: "Thanks for providing feedback - let's go!" },
};

const formDefault: TTemplate['preset'] = {
  name: "New Form",
  welcomeCard: welcomeCardDefault,
  thankYouCard: thankYouCardDefault,
  questions: [],
}

export const template: TTemplate[] = [
  {
    name: "Creaket premium league",
    description: "Understand the reasons behind cart abandonment in your web shop",
    preset: {
      ...formDefault,
      name: "Enter the player name",
      questions: [
        {
          id: createId(),
          type: TFormQuestionTypeEnum.OpenText,
          headline: {
            default: "Please elaborate on your reason for not completing the purchase:",
          },
          required: false,
          inputType: "text",
        },
        {
          id: createId(),
          type: TFormQuestionTypeEnum.OpenText,
          headline: {
            default: "Please elaborate on your reason for not completing the purchase:",
          },
          required: false,
          inputType: "text",
        },
      ]
    }
  },
  {
    name: "Site Abandonment Survey",
    description: "Understand the reasons behind site abandonment in your web shop.",
    preset: {
      ...formDefault,
      name: "Site Abandonment Survey",
      questions: [
        {
          id: createId(),
          type: TFormQuestionTypeEnum.OpenText,
          headline: {
            default: "Please elaborate on your reason for leaving the site:",
          },
          required: false,
          inputType: "text",
        },
      ]
    }
  }
]


export const customForm: TTemplate = {
  name: "Start from scratch",
  description: "Create a form without template.",
  preset: {
    ...formDefault,
    name: "New Form",
    questions: [
      {
        id: createId(),
        type: TFormQuestionTypeEnum.OpenText,
        headline: { default: "What would you like to know?" },
        subheader: { default: "This is an example survey." },
        placeholder: { default: "Type your answer here..." },
        required: true,
        inputType: "text",
      } as TFormOpenTextQuestion,
    ],
  }
};


export const replaceQuestionPresetPlaceholders = (
  question: TFormQuestion,
  product?: TProduct
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
export const replacePresetPlaceholders = (template: TTemplate) => {
  const preset = structuredClone(template.preset);
  // Replace placeholders in the preset name

  // Replace placeholders in each question
  preset.questions = preset.questions.map((question) => {
    return replaceQuestionPresetPlaceholders(question);
  });

  return { ...template, preset };
};