import { config } from 'dotenv';
import * as process from 'process';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const ALGORITHM = 'HS256';

export const {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  DISCORD_SECRET_KEY,
  DISCORD_CLIENT_ID,
  DISCORD_PORT,
  SECRET_KEY,
  JWT_SECRET_KEY,
} = process.env;
