import redisClient from "../config/redisClient";

interface RevalidateProps {
    id?: string;
    productId?: string;
}

export const environmentCache = {
    tag: {
        byId(id: string) {
            return `environments-${id}`;
        },
        byProductId(productId: string) {
            return `products-${productId}-environments`;
        },
    },
    revalidate({ id, productId }: RevalidateProps): void {
        if (id) {
            redisClient.del(this.tag.byId(id));
        }

        if (productId) {
            redisClient.del(this.tag.byProductId(productId));
        }
    },
};