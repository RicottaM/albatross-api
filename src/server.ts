import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import logger from '@/config/logger';
import categoryRouter from '@/api/routes/category.routes';
import authRouter from '@/api/routes/auth.routes';
import { errorHandler } from '@/error/error-handler';

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'development';
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/categories', categoryRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.clear();
  logger.info(`[server] Server is running on http://localhost:${port} at ${mode} mode.`);
});
