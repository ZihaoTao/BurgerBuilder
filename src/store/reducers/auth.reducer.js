import * as actionTypes from '../actions/actionTypes';

const initState = {
	authStart: false,
	error: null,
	token: null,
	userId: null
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				authStart: true
			};
		case actionTypes.AUTH_LOADING:
			return {
				...state,
				token: action.token,
				userId: action.userId
			};
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				authStart: false,
				userId: action.authData.localId,
				token: action.authData.idToken,
				error: null
			};
		case actionTypes.AUTH_FAILED:
			return {
				...state,
				authStart: false,
				error: action.error
			};
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null
			}
		default:
			return state;
	}
}

export default reducer;