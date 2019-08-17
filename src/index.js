import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import reducers from './reducer'
import './config'
import Login from './container/login/login'
import Signup from './container/signup/signup'
import MentorInfo from './container/mentorinfo/mentorinfo'
import MenteeInfo from './container/menteeinfo/menteeinfo'
import Chat from './component/chat/chat'
import Dashboard from './component/Dashboard/dashboard'
import AuthRoute from './component/authroute/authroute'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <AuthRoute></AuthRoute>
            <Switch>
                <Route path = '/mentorinfo' component={MentorInfo}></Route>
                <Route path = '/menteeinfo' component={MenteeInfo}></Route>
                <Route path = '/login' component={Login}></Route>
                <Route path = '/signup' component={Signup}></Route>
                <Route path = '/chat/:user' component={Chat}></Route>
                <Route component={Dashboard}></Route>
            </Switch>
        </BrowserRouter>
    </Provider>)
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
