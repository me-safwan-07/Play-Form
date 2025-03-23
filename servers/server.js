import express from 'express';
import passport from './src/config/passport.js';
import { errorHandler } from './src/utils/errorHandler.js';
import router from './src/routes/index.js';
const app = express();

// Middleware
app.use(express.json());

app.use(passport.initialize());

// Routes
app.use('/api', router);

// Error handler middleware
app.use(errorHandler);
// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})