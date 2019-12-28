import 'materialize-css/dist/css/materialize.min.css'; //add in the file extension .css because it is not a js file. Not a relative file path because that is how we import stuff from node_modules directory
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //provider makes component in react app able to access store where state is 
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))  //first argument is reducers we will use , second argument is initial state, 3rd argument - middleware invocation

//We pass in store into provider and nested in provider is the app.js component. 
//The provider is a react component that knows how to read changes from our redux store. 
//any time the redux store state changes, it informs any of its children, in this case, the app.js component and will update those child components of the new state
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
); //render to index.html <div> with id of 'root'

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV); //process.env.NODE_ENV - will be 'development' or 'production'