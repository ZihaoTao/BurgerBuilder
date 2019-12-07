import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	};
};

export const logout = () => {
	localStorage.clear();
	return {
		type: actionTypes.AUTH_LOGOUT
	};
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authFailed = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error
	};
};

export const authLoading = () => {
	return {
		type: actionTypes.AUTH_LOADING,
		token: localStorage.getItem('token'),
		userId: localStorage.getItem('userId')
	};
};

export const auth = (email, password, isSignUp) => {
	const authData = {
		email: email,
		password: password,
		returnSecureToken: true
	};

	const URL = isSignUp ? 
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsJNNmWoTAzcU2TDsPQmltz-IGPOO-3hk' :
		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsJNNmWoTAzcU2TDsPQmltz-IGPOO-3hk' 
	return dispatch => {
		dispatch(authStart());
		
		axios.post(URL, authData)
			.then(res => {
				const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
				dispatch(authSuccess(res.data));
				dispatch(checkAuthTimeout(res.data.expiresIn));
				localStorage.setItem('token', res.data.idToken);
				localStorage.setItem('userId', res.data.localId);
				localStorage.setItem('expirationDate', expirationDate)
			})
			.catch(err => {
				dispatch(authFailed(err.response.data.error));
			})
	}
}