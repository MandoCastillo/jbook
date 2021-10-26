import 'bulmaswatch/superhero/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugins';
import { fetchPlugin } from './plugins/fecth-pluging';
import CodeEditor from './components/code-editor';
import { codeExample } from './helpers/consts';

const App = () => {
  const [input, setInput] = useState<string>(codeExample);
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
    <html lang="en">
      <head title="code preview"></head>
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
    <CodeEditor
      initialValue={codeExample}
      onChange={(value) => setInput(value)}
    />
    {/*<textarea*/}
    {/*  value={input}*/}
    {/*  onChange={event => setInput(event.target.value)}*/}
    {/*/>*/}
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
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
