import * as actionTypes from '../actions/actionTypes';

const initState = {
	loading: false,
	orders: [],
	error: false,
	purchaseFinished: false
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.SET_ORDERS:
			return {
				...state,
				orders: action.orders,
				error: false
			};
		case actionTypes.FETCH_ORDERS_FAILED:
			return {
				...state,
				error: true
			}
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId
			}
			return {
				...state,
				orders: state.orders.concat(newOrder),
				loading: false,
				purchaseFinished: true
			};
		case actionTypes.PURCHASE_BURGER_FAILED:
			return {
				...state,
				error: true,
				loading: false
			};
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true
			}
		default:
			return state;
	}
}

export default reducer;