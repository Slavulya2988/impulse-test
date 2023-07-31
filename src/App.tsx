import React from 'react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import './App.css';
import Controller from './components/Controller/Controller';
import reducer from './store/reducer';
import { GameAction, GameState, DispatchType } from './store/type';

const store: Store<GameState, GameAction> & {
  dispatch: DispatchType
} = createStore(reducer);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Controller />
      </Provider>
    </div>
  );
}

export default App;
