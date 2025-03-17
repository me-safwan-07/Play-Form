import redisClient from "../../config/redisClient";


interface RevalidateProps {
    id?: string;
    environmentId?: string,
    segmentId?: string,
}

export const formCache = {
    tag: {
        byId(id: string) {
            return `forms-${id}`;
        },
        byEnvironementId(environmentId: string) {
            return `environment-${environmentId}-forms`;
        },
        bySegmentId(segmentId: string) {
            return `segments-${segmentId}-forms`;
        },
    },

    revalidate({ id, environmentId, segmentId }: RevalidateProps): void {
        if (id) {
            redisClient.del(this.tag.byId(id));
        }

        if (environmentId) {
            redisClient.del(this.tag.byEnvironementId(environmentId));
        }

        if (segmentId) {
            redisClient.del(this.tag.bySegmentId(segmentId));
        }
    },
};