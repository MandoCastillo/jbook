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
