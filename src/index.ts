import 'module-alias/register';
import 'dotenv/config';
import express from 'express';
import logger from '@/config/logger';
import categoryRouter from '@/api/routes/category.routes';
import { errorHandler } from './error/error-handler';

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'development';
const app = express();

app.use(express.json());
app.use(categoryRouter);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`[server] Server is running on http://localhost:${port} at ${mode} mode.`);
});
