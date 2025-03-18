import redisClient from './redisClient.js'

/**
 * Fetch data from cache or fallback to the provided function.
 * @param {string} key - Cache key.
 * @param {function} fn - Fallback function to fetch data if cache miss.
 * @param {number} ttl - Time-to-live for the cache in seconds (default: 1 hour).
 * @returns {Promise} - Resolves with the cached or fetched data.
 */
export const cache = async (key, fn, ttl = 3600) => {
  try {
    // Check if Redis client is connected
    if (!redisClient.isOpen) {
      console.warn('Redis client not connected. Falling back to database.');
      return await fn();
    }

    // Attempt to fetch data from cache
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      console.log('Cache Hit:', key);
      return JSON.parse(cachedData);
    }

    // Cache miss: Fetch data from the fallback function
    console.log('Cache Miss:', key);
    const data = await fn();

    // If data is found, store it in the cache
    if (data) {
      await redisClient.set(key, JSON.stringify(data), { EX: ttl });
      console.log('Cache Stored:', key);
    }

    return data;
  } catch (error) {
    console.error('Cache Error:', error);
    // Fallback to the provided function in case of any error
    return await fn();
  }
};

/**
 * Revalidate (delete) a specific cache key.
 * @param {string} key - Cache key to revalidate.
 */
export const revalidateCache = async (key) => {
  try {
    if (redisClient.isOpen) {
      await redisClient.del(key);
      console.log('Cache Revalidated:', key);
    }
  } catch (error) {
    console.error('Revalidate Cache Error:', error);
  }
};