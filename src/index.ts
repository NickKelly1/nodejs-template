import { boot } from './boot';
import { logger } from './logger';

boot();

logger.info('------------------------------');
logger.info('ready');
throw new Error('error done!');
