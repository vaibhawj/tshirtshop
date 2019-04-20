import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import searchPageReducer from './pages/search/reducer';
import cartReducer from './pages/cart/reducer';

let store = createStore(
    combineReducers({
        searchPage: searchPageReducer,
        cart: cartReducer
    }),
    applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
