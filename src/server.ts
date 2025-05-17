import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from '@/config/logger';
import pointRouter from './api/routes/point.routes';
import categoryRouter from '@/api/routes/category.routes';
import authRouter from '@/api/routes/auth.routes';
import { errorHandler } from '@/middleware/errorHandler';

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'development';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/categories', categoryRouter);
app.use('/points', pointRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.clear();
  logger.info(`[server] Server is running on http://localhost:${port} at ${mode} mode.`);
});
