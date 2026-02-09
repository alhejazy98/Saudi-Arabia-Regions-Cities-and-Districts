import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const external = [];

const plugins = [
  resolve({
    extensions: ['.js', '.ts'],
  }),
  commonjs(),
  json(),
];

export default [
  // Full version with all data
  {
    input: 'dist-temp/src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'SaudiGeodata',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    external,
    plugins,
  },
  // Lite version (without boundaries/center data)
  {
    input: 'dist-temp/src/lite.js',
    output: [
      {
        file: 'dist/lite.js',
        format: 'umd',
        name: 'SaudiGeodataLite',
        sourcemap: true,
      },
      {
        file: 'dist/lite.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/lite.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    external,
    plugins,
  },
];
