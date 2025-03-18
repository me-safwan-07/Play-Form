import express from 'express';
import userRouter from './src/routes/user.routes.js'
import { errorHandler } from './src/utils/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRouter);

// Error handler middleware
app.use(errorHandler);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})