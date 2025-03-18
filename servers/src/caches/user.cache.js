import { revalidateCache } from '../utils/cacheWrapper.js';


export const userCache = {
  tag: {
    byId(id) {
      return `users:id:${id}`;
    },
    byEmail(email) {
      return `users:email:${email}`;
    },
    byCount() {
      return 'users:count';
    },
  },
  revalidate(id, email, count) {
    if (id) {
      revalidateCache(this.tag.byId(id));
    }

    if (email) {
      revalidateCache(this.tag.byEmail(email));
    }

    if (count) {
      revalidateCache(this.tag.byCount());
    }
  }
};