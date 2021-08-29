import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import packageJson from '../package.json';

/** @typedef {import('rollup').RollupOptions} RollupOptions */

/** @type {RollupOptions} */
const options = {
  input: 'src/index.ts',
  external: /node_modules/,
  output: [
    {
      interop: 'auto',
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({ preferBuiltins: true, }),
    commonjs(),
    typescript({ tsconfig: 'config/tsconfig.build.json', }),
    json(),
    terser(),
  ],
};

/** @type {RollupOptions} */
export default [options,];
