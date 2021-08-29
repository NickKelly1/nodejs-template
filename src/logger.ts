/* eslint-disable no-sync */
import 'winston-daily-rotate-file';
import { Writable } from 'stream';
import winston from 'winston';
import fs from 'fs';
import { DIR_LOGS } from './dir';
import { Env } from './env';
import { inspect } from 'util';

/**
 * Logger
 *
 * Logs to console and to files
 *
 * Files rotate daily
 *
 * Old log files may are achirved
 *
 * Logger may be configured with environment variables from a .env
 */

// https://medium.com/@helabenkhalfallah/nodejs-rest-api-with-express-passport-jwt-and-mongodb-98e5f2fee496

// create log file if not exist
const logDir = DIR_LOGS();
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true, });
  if (!fs.existsSync(logDir)) {
    throw new Error(`Failed to create logDirectory: ${logDir}`);
  }
}

const nocolorFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', }),
  winston.format.printf((info) => {
    const { timestamp, level, message, } = info;
    return `${timestamp} [${level}]: ${unknownToString(message, false)}`.trim();
  }),
  winston.format.align(),
);

const colorFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', }),
  winston.format.printf((info) => {
    const { timestamp, level, message, } = info;
    return `${timestamp} [${level}]: ${unknownToString(message, true)}`.trim();
  }),
  winston.format.align(),
);

// app logger config
export const logger = winston.createLogger({
  exitOnError: false,

  transports: [
    // https://www.npmjs.com/package/winston-daily-rotate-file

    // info file
    new winston.transports.DailyRotateFile({
      level: 'debug',
      dirname: logDir,
      filename: '%DATE%.info.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: Env.LOGS_COMPRESS, // gzip
      format: nocolorFormat,
      maxSize: Env.LOGS_MAX_SIZE,
      maxFiles: Env.LOGS_ROTATION_MAX_AGE,
      handleExceptions: false, // handle manually
    }),

    // error file
    new winston.transports.DailyRotateFile({
      level: 'warn',
      dirname: logDir,
      filename: '%DATE%.error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: Env.LOGS_COMPRESS, // gzip
      format: nocolorFormat,
      maxSize: Env.LOGS_MAX_SIZE,
      maxFiles: Env.LOGS_ROTATION_MAX_AGE,
      handleExceptions: false, // handle manually
    }),

    // console
    new winston.transports.Console({
      level: 'debug',
      format: colorFormat,
      handleExceptions: false, // handle manually
    }),
  ],
});

/**
 * loggerStream
 *
 * Anything written to this stream will be logged
 */
export const LoggerStream = new Writable({
  write(chunk: string | Buffer, _, done) {
    if (Buffer.isBuffer(chunk)) {
      // strip off morgan new lines...
      logger.info(clean(chunk.toString('utf-8')));
      return void done();
    }
    else if (typeof chunk === 'string') {
      logger.info(clean(chunk));
      return void done();
    }

    // ?
    logger.info(chunk);
    return void done();
  },
});

function clean(str: string) {
  return str
    .trim()
    .replace(/\n+%/, '')
    .trim();
}

/**
 * Convert an unknown type to a string
 *
 * @param unknown
 * @param color
 * @returns
 */
export function unknownToString(unknown: unknown, color: boolean): string {
  try {
    switch (typeof unknown) {
    case 'string':
      return unknown;
    case 'number':
    case 'boolean':
    case 'symbol':
    case 'bigint':
    case 'undefined':
      return String(unknown);
    case 'object':
    case 'function':
      if (unknown === null) return String(null);
      return inspect(unknown, false, 10, color);
    default:
      return String(unknown);
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    try {
      return String(unknown);
    } catch (err2: unknown) {
      if (err && typeof err.message === 'string') {
        return `Error: failed to print object. ${err.message}`;
      }
      return 'Error: failed to print object';
    }
  }
}
