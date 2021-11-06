import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { esbuildInitialize } from './bundler';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import { Provider } from 'react-redux';
import { store } from './state';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    esbuildInitialize()
      .then(() => setIsLoading(false))
      .catch(console.log);
    return () => {
    };
  }, []);

  return (
    <Provider store={store}>
      <div>
        {isLoading ? <p>Cargando</p> :
          <>
            {/*<CodeCell />*/}
            <TextEditor />
          </>
        }
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
