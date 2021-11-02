import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

import { esbuildInitialize } from './bundler';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    esbuildInitialize()
      .then(() => setIsLoading(false))
      .catch(console.log);
    return () => {
    };
  }, []);

  return <div>
    {isLoading ? <p>Cargando</p> :
      <>
        {/*<CodeCell />*/}
        <TextEditor />
      </>
    }
  </div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));
