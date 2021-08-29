import { config } from 'dotenv';
import { boolean, key, parse, string } from '@nkp/config';
import { DIR_ROOT } from './dir';

config({ path: DIR_ROOT('.env'), });

interface IEnv {
  LOGS_COMPRESS: boolean
  LOGS_MAX_SIZE: string,
  LOGS_ROTATION_MAX_AGE: string,
}

export const Env: IEnv = parse({
  LOGS_COMPRESS: key('LOGS_COMPRESS').as(boolean(true)),
  LOGS_MAX_SIZE: key('LOGS_MAX_SIZE').as(string('10mb')),
  LOGS_ROTATION_MAX_AGE: key('LOGS_ROTATION_MAX_AGE').as(string('7d')),
}, process.env);
