import * as esbuild from 'esbuild-wasm';
import ReactDom from 'react-dom';
import { useEffect, useState } from 'react';

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
    try {
      const res = await esbuild.transform(input, {
        loader: 'jsx',
        target: 'es2015'
      });

      setCode(res.code)
      console.log(res);
    } catch (err) {
      console.error(err);
    }
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
