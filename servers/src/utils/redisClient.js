import { createClient } from 'redis';

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
