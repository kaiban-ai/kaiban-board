// rollup.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import tailwindcss from 'tailwindcss';  // Import Tailwind
import autoprefixer from 'autoprefixer'; // Import Autoprefixer
import terser from '@rollup/plugin-terser';  // Use the new Terser plugin
import { fileURLToPath } from 'url';
import { dirname, resolve as pathResolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json
const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url))
);

export default {
  input: 'src/components/KaibanBoard/index.jsx', // Entry point for your component
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: false,
    preserveModules: true,
    preserveModulesRoot: 'src',
    plugins: [terser()],  // Minify JS using Terser
  },
  plugins: [
    peerDepsExternal(), // Exclude peer dependencies like React from the bundle
    resolve({
      extensions: ['.js', '.jsx'], // Resolve JS and JSX files
    }),
    commonjs(), // Convert CommonJS to ES Modules
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    postcss({
      extract: 'dist/index.css', // Extracts CSS into separate files
      minimize: true,        // Minify the extracted CSS      
      plugins: [
        tailwindcss(), // Add Tailwind CSS as a plugin
        autoprefixer(), // Add Autoprefixer for browser compatibility
      ],
    }),
    image(), // Handle image imports
    json(), // Handle JSON imports
  ],
  external: [
    'react', 
    'react-dom', 
    'kaibanjs',
    '@kaibanjs/tools',
    '@langchain/community/tools/tavily_search',
    '@langchain/community/tools/searchapi',
    '@langchain/openai'
  ], // Mark these as external to prevent bundling
};
