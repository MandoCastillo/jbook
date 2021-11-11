import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { esbuildInitialize } from './bundler';
import { Provider } from 'react-redux';
import { store } from './state';
import { CellList } from './components/cell-list';

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
      {isLoading ? <p>Cargando</p> :
        <CellList />
      }
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
