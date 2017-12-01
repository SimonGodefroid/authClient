// action creators file
import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:5000';

export function signinUser({ email, password }) {
	return function(dispatch) {
		// redux thunk allows to return a function from an action creator and that will be called with the dispatch method.
		// the dispatch method sends an action to the middlewares of redux
		// dispatch({type:..., payload:...})
		// Submit email/password to the server
		axios
			.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect to the route '/feature'
				browserHistory.push('/feature');
			})
			.catch(() => {
				// If request is bad...
				// - Show an error to the user
				dispatch(authError('Bad Login Info'));
			});
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signOutUser() {
	localStorage.removeItem('token');
	return { type: UNAUTH_USER };
}
