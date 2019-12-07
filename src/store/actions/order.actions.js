import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const setOrders = (orders) => {
	return {
		type: actionTypes.SET_ORDERS,
		orders: orders
	};
};

export const initOrders = (token, userId) => {
	return dispatch => {
		axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"')
			.then(res => {
				const fetchOrders = [];
				for(let key in res.data) {
					fetchOrders.push({
						id: key,
						...res.data[key]
					});
				}
				dispatch(setOrders(fetchOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFailed());
			});
	}
};

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFailed = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
};

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post('/orders.json?auth=' + token, orderData)
			.then(res => {
				dispatch(purchaseBurgerSuccess(res.data.name, orderData));
			})
			.catch(err => {
				dispatch(purchaseBurgerFailed());
			});
	}
}

export const fetchOrdersFailed = () => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
	};
}  