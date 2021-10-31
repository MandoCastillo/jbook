export const codeExample = `// example to use
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';

const App = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1 className="has-text-info is-size-2">Counter {number}</h1>
      <button className="button is-info" onClick={() => setNumber(number + 1)}>
        +1
      </button>
      <button className="button is-info" onClick={() => setNumber(number - 1)}>
        -1
      </button>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));`

export const html = `
    <html lang="en">
      <head title="code preview">
        <style>html {background-color: white}</style>
      </head>
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
