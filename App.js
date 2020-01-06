import React from 'react';
import SwitchNavigator from './navigation/SwitchNavigator';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import firebase from './config/firebase';
// Does give you apportunity to do asynchronous despatch
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware);
console.disableYellowBox = true;

// Using redux store
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SwitchNavigator/>
      </Provider>
    );
  }
}
