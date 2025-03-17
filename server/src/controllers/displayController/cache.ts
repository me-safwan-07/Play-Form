import redisClient from "../../config/redisClient";

interface RevalidateProps {
    id?: string;
    formId?: string;
    personId?: string;
    environmentId?: string;
}

export const displayCache = {
    tag: {
        byId(id: string) {
            return `displays-${id}`;
        },
        byFormId(formId: string) {
            return `forms-${formId}-displays`;
        },
        byPersonId(personId: string) {
            return `people-${personId}-displays`;
        },
        byEnvironmentId(environmentId: string) {
            return `environments-${environmentId}-displays`;
        },
    },
    revalidate({ id, formId, personId, environmentId}: RevalidateProps): void {
        if (id) {
            redisClient.del(this.tag.byId(id));
        }

        if (formId) {
            redisClient.del(this.tag.byFormId(formId));
        }

        if (personId) {
            redisClient.del(this.tag.byPersonId(personId));
        }

        if (environmentId) {
            redisClient.del(this.tag.byEnvironmentId(environmentId));
        }
    },
};