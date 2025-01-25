"use strict";
// import redisClient from '../config/redis';
// export class CacheService {
//   private static instance: CacheService;
//   private constructor() {}
//   public static getInstance(): CacheService {
//     if (!CacheService.instance) {
//       CacheService.instance = new CacheService();
//     }
//     return CacheService.instance;
//   }
//   async get<T>(key: string): Promise<T | null> {
//     try {
//       const data = await redisClient.get(key);
//       return data ? JSON.parse(data) : null;
//     } catch (error) {
//       console.error('Cache get error:', error);
//       return null;
//     }
//   }
//   async set(key: string, value: any, duration: number = 300): Promise<void> {
//     try {
//       await redisClient.setex(key, duration, JSON.stringify(value));
//     } catch (error) {
//       console.error('Cache set error:', error);
//     }
//   }
//   async delete(key: string): Promise<void> {
//     try {
//       await redisClient.del(key);
//     } catch (error) {
//       console.error('Cache delete error:', error);
//     }
//   }
//   async deletePattern(pattern: string): Promise<void> {
//     try {
//       const keys = await redisClient.keys(pattern);
//       if (keys.length > 0) {
//         await redisClient.del(...keys);
//       }
//     } catch (error) {
//       console.error('Cache delete pattern error:', error);
//     }
//   }
// }
// export default CacheService.getInstance(); 
