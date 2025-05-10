import 'module-alias/register';
import 'dotenv/config';
import express from 'express';
import logger from '@/config/logger';

const app = express();
const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'development';

app.listen(port, () => {
  logger.info(`[main] Server is running on http://localhost:${port} at ${mode} mode.`);
});
