import { createClient } from 'redis';

// const redisClient = createClient({
//     username: 'default',
//     password: 'CWvmn4vXgGPtmHuVLAhBjEfibr2QAELd',
//     socket: {
//         host: 'redis-18860.c83.us-east-1-2.ec2.redns.redis-cloud.com',
//         port: 18860
//     }
// });

// redisClient.on('error', err => console.log('Redis Client Error', err));

// await redisClient.connect();

// await redisClient.set('foo', 'bar');
// const result = await redisClient.get('foo');
// console.log(result)  // >>> bar

// export default redisClient

// Initialize Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

// Event listeners for connection status
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
redisClient.connect()
  .then(() => console.log('Redis client connected successfully'))
  .catch(err => console.error('Failed to connect to Redis:', err));

export default redisClient;
