import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import SignUp from './components/auth/SignUp';
import Feature from './components/Feature';
import RequireAuth from './components/auth/requireAuth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// if we have a token, consider the user to be signed in
if (token) {
	// we nedd to update application state
	// we do it through dispatch
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path={`/`} component={App}>
				<IndexRoute component={Welcome} />
				<Route path={`/signin`} component={SignIn} />
				<Route path={`/signout`} component={SignOut} />
				<Route path={`/signup`} component={SignUp} />
				<Route path={`/feature`} component={RequireAuth(Feature)} />
			</Route>
			<App />
		</Router>
	</Provider>,
	document.querySelector('.container')
);
