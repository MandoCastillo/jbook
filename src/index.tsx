import * as esbuild from 'esbuild-wasm';
import ReactDom from 'react-dom';
import { useEffect, useState } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugins';

const App = () => {
  const [input, setInput] = useState<string>('');
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    startService();
    return () => {

    };
  }, []);

  const startService = async () => {
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: '/esbuild.wasm'
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onClick = async () => {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()]
    });

    // console.log(result);
  setCode(result.outputFiles[0].text)
  };

  return <div>
    <textarea value={input} onChange={event => setInput(event.target.value)} />
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
  </div>;
};

ReactDom.render(<App />, document.querySelector('#root'));
