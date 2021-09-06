import path from 'path';

/**
 * Get a file from the root
 *
 * @param segs
 * @returns
 */
export const DIR_ROOT = (...segs: string[]): string => path.normalize(path.join(process.cwd(), ...segs));

/**
 * Get a file from storage
 *
 * @param segs
 * @returns
 */
export const DIR_STORAGE = (...segs: string[]): string => DIR_ROOT('storage', ...segs);


/**
 * Get a file from logs
 *
 * @param segs
 * @returns
 */
export const DIR_LOGS = (...segs: string[]): string => DIR_STORAGE('logs', ...segs);
