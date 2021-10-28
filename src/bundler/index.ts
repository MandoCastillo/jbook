import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugins';
import { fetchPlugin } from './plugins/fecth-pluging';

export const esbuildInitialize = async (): Promise<void> => {
  await esbuild.initialize({
    worker: true,
    wasmURL: '/esbuild.wasm'
  });
};

export const codeResult = async (inputCode: string): Promise<string> => {
  const result = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(inputCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window'
    }
  });

  return result.outputFiles[0].text;
};
