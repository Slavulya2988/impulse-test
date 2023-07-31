import React from 'react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

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
        <ErrorBoundary fallback={<div><h5>Beautiful Error page</h5></div>}>
          <Controller />
        </ErrorBoundary>
      </Provider>
    </div>
  );
}

export default App;
