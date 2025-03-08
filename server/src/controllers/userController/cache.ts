import redisClient from "../../config/redisClient";

interface RevalidateProps {
    id?: string;
    email?: string;
    count?: boolean;
}

export const userCache = {
    tag: {
        byId(id: string) {
            return `users-${id}`;
        },
        byEmail(email: string) {
            return `users-${email}`;
        },
        byCount() {
            return 'users-count';
        },
    },

    async revalidate({ id, email, count }: RevalidateProps): Promise<void> {
        if (id) {
            await redisClient.del(this.tag.byId(id));
        }

        if (email) {
            await redisClient.del(this.tag.byEmail(email));
        }

        if (count) {
            await redisClient.del(this.tag.byCount());
        }
    },
};
