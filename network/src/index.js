import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//reducers
import rootReducer from './Reducers/combineIndex';
//PubSub Class for connect() between PubNub channel arquitec. and Redux
import {PubSub , PubSubContext} from './pubsub';
import {newMessage} from './Actions/messages';
//App Store
const store = createStore(
  rootReducer ,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);

 // 1. Initial state
console.log('store.getState()' , store.getState());
// 2. After every update
store.subscribe( () => console.log('State Status' , store.getState()));

//Instantiate it
const pubsub = new PubSub();

pubsub.addListener({
  message: messageObj => {
    const { message , channel } = messageObj;
    console.log('Received msg' , message , 'channel: ' , channel);

    //Send it as An Action Obj to redux Reducers
    store.dispatch(message);
  } 
})

setTimeout( () => {
  pubsub.publish(newMessage({ text:'Hello world' , userName: 'Bobo'}));
}, 1000 );


ReactDOM.render(
  <Provider store={store}>
    <PubSubContext.Provider value={{ pubsub }}>
      <App />
    </PubSubContext.Provider> 
  </Provider> , 
  document.getElementById('root')
);
