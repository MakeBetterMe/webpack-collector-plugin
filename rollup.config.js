import {babel} from '@rollup/plugin-babel';
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import strip from '@rollup/plugin-strip';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'es',
      file: './dist/index.esm.js',
    },
    {
      format: 'umd',
      file: './dist/index.umd.js',
      name: 'webpack-collector-plugin',
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    terser(),
    strip(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    })
  ]
};
