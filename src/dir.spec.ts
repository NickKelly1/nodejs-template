import { DIR_DIST, DIR_LOGS, DIR_ROOT, DIR_SRC, DIR_STORAGE } from './dir';
import path from 'path';

describe('DIR', () => {
  describe('DIR_ROOT', () => {
    it('should work', () => {
      expect(DIR_ROOT()).not.toMatch(/[\\/](src|dist|storage)$/);
      expect(DIR_ROOT()).toBe(process.cwd());
      expect(DIR_ROOT('xxx')).toBe(path.join(process.cwd(), 'xxx'));
    });
  });

  describe('DIR_SRC', () => {
    it('should work', () => {
      expect(DIR_SRC()).toBe(path.join(process.cwd(), 'src'));
      expect(DIR_SRC('index.ts')).toBe(path.join(process.cwd(), 'src', 'index.ts'));
    });
  });

  describe('DIR_DIST', () => {
    it('should work', () => {
      expect(DIR_DIST()).toBe(path.join(process.cwd(), 'dist'));
      expect(DIR_DIST('index.js')).toBe(path.join(process.cwd(), 'dist', 'index.js'));
    });
  });

  describe('DIR_STORAGE', () => {
    it('should work', () => {
      expect(DIR_STORAGE()).toBe(path.join(process.cwd(), 'storage'));
      expect(DIR_STORAGE('keys')).toBe(path.join(process.cwd(), 'storage', 'keys'));
    });
  });

  describe('DIR_LOGS', () => {
    it('should work', () => {
      expect(DIR_LOGS()).toBe(path.join(process.cwd(), 'storage', 'logs'));
      expect(DIR_LOGS('info.log')).toBe(path.join(process.cwd(), 'storage', 'logs', 'info.log'));
    });
  });
});
