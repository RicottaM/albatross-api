import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const dailyFileTransport = new DailyRotateFile({
  filename: '%DATE%.log',
  dirname: path.join(process.cwd(), 'logs'),
  datePattern: 'DD-MM-YYYY',
  zippedArchive: false,
  maxFiles: '14d',
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]${message}`;
        })
      ),
    }),
    dailyFileTransport,
  ],
});

export default logger;
