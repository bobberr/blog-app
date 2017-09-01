import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import flagReducer from './flagReducer';
import dataReducer from './dataReducer';


const rootReducer = combineReducers({flags: flagReducer, routing: routerReducer, data: dataReducer});

module.exports = rootReducer;