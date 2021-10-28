import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

import { esbuildInitialize } from './bundler';
import CodeCell from './components/code-cell';

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
        <CodeCell />
        {/*<CodeCell />*/}
      </>
    }
  </div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));
