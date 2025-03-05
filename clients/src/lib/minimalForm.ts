import { TForm } from "@/types/forms";

export const minimalForm: TForm = {
    id: "someUniqueId1",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Minimal Form",
    environmentId: "someEnvId1",
    status: "draft",
    autoClose: null,
    redirectUrl: null,
    displayLimit: null,
    welcomeCard: {
        enabled: false,
        headline: { default: "Welcome!" },
        html: { default: "Thank for provideing You Form - let's go" }, 
    },
    questions: [],
    thankYouCard: {
        enabled: false
    },
    delay: 0, // No delay
    displayPercentage: null,
    autoComplete: null,
    runOnDate: null,
    closeOnDate: null,
    styling: null,
    resultShareKey: null,
}