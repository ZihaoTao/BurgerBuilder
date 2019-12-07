import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/';

const Orders = props => {
	useEffect(() => {
		if(props.token && props.userId) {
			props.onOrderInit(props.token, props.userId);
		}
	}, []);

	const orders = props.loading ? <Spinner /> : 
		props.orders.map(el => <Order key={el.id} {...el} />);
	
	const redirect = props.token ? null : <Redirect to='/' />;

	return (
		<div>
			{redirect}
			{orders}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.orders.loading,
		orders: state.orders.orders,
		error: state.orders.error,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderInit: (token, userId) => dispatch(actions.initOrders(token, userId)),
		onAuthLoading: () => dispatch(actions.authLoading())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));