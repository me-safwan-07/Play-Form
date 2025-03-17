import redisClient from './redisClient';
import { parse, stringify } from 'superjson';

/**
 * Cache wrapper function for Redis
 * @param fn - The function to cache
 * @param keyPrefix - The prefix for the cache key
 * @param ttl - Time-to-live for the cache in seconds (default: 3600)
 * @returns A cached version of the function
 */

interface CacheOption {
    ttl?: number,
    tag?: string[],
}
export const cache = <T, P extends unknown[]>(
  fn: (...params: P) => Promise<T>,
  keyPrefix: string,
  options: CacheOption = { ttl: 3600 }, 
): ((...params: P) => Promise<T>) => {
  
  return async (...params: P): Promise<T> => {
    const cacheKey = `${keyPrefix}:${JSON.stringify(params)}`;

    // ✅ Check if the data is already cached in Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return parse<T>(cachedData); // 🔥 Return cached response
    }

    // ✅ Run the function if no cache exists
    const result = await fn(...params);

    // ✅ Cache the result in Redis
    await redisClient.set(cacheKey, stringify(result), 'EX', options.ttl || 3600);
    
    // Handle tag-based cache invalidation (optional)
    if (options.tag) {
        for (const tag of options.tag) {
            await redisClient.sadd(tag, cacheKey);
        }
    }

    return result;
  };
};
