import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

const external = [];

const plugins = [
  json(),
  typescript({
    tsconfig: './tsconfig.json',
  }),
];

export default [
  // Full version with all data
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
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
    input: 'src/lite.ts',
    output: [
      {
        file: 'dist/lite.js',
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
