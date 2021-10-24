import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugins';
import { fetchPlugin } from './plugins/fecth-pluging';

const App = () => {
  const [input, setInput] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const iframe = useRef<any>();

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
    iframe.current.srcdoc = html;
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return <div>
    <textarea
      style={{width: 500, height: 300}} value={input}
      onChange={event => setInput(event.target.value)}
    />
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{`
// example to use
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  
  const [number, setNumber] = useState(0);
  
  return (
    <>
      <h1>Counter {number}</h1>
      <button onClick={()=> setNumber(number+1) }>+1</button>
       <button onClick={()=> setNumber(number-1) }>-1</button>
    </>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));`
    }</pre>
    <iframe
      ref={iframe}
      title="code preview"
      sandbox="allow-scripts"
      srcDoc={html}
      frameBorder="1"
    />
  </div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));
