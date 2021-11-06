import { combineReducers } from 'redux';
import cellsReducer from './cell.reducer';

const reducers = combineReducers({
  cell: cellsReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>
