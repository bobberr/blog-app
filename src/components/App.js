import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory, Route, Router} from 'react-router';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer';
import Welcome from '../containers/Welcome'; 
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp'; 
import SinglePost from '../containers/SinglePost';
import SuccessRegistr from '../components/SuccessRegistr';
import UserScren from '../containers/UserScreen';
import {autoRehydrate, persistStore} from 'redux-persist';
import {createFilter} from 'redux-persist-transform-filter';

const store = createStore(rootReducer, 
                            compose(applyMiddleware(thunk), autoRehydrate()));
const filter = createFilter('flags', ['logged', 'token', 'loggedUsername']);  
const data = createFilter('data', ['categories', 'posts']);                          

persistStore(store, {
    transforms: [filter, data]
});

const history = syncHistoryWithStore(browserHistory, store);

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={Welcome}/>
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/sign-up" component={SignUp}/>  
                <Route path="/logged" component={UserScren}/>
                <Route path="/successfull-registration" component={SuccessRegistr}/>
                <Route path="/post" component={SinglePost}/>
            </Router>
        </Provider>
    )
}

module.exports = App;