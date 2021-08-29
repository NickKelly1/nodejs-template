import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

/** @typedef {import('rollup').Plugin} Plugin */
/** @typedef {import('rollup').RollupOptions} RollupOptions */
/** @typedef {import('rollup').OutputOptions} OutputOptions */
/** @typedef {import('rollup').InputOptions} InputOptions */

// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

/** @type {RollupOptions} */
const options = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    // @ts-ignore   peerDepsExternal is typed wrong
    /** @type {Plugin} */ peerDepsExternal(),
    resolve({ preferBuiltins: true, }),
    commonjs(),
    typescript({ tsconfig: 'config/tsconfig.build.json', }),
    json(),
    terser(),
  ],
};

/** @type {RollupOptions} */
export default [options,];
