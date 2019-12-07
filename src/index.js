import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import burgerBuilder from './store/reducers/burgerBuilder.reducer';
import orders from './store/reducers/order.reducer';
import auth from './store/reducers/auth.reducer';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	burgerBuilder:burgerBuilder,
	orders: orders,
	auth: auth
});

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
  )); 

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

