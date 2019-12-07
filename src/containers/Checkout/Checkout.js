import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
	const cancelHandler = () => props.history.push('/burger-builder');
	const continueHandler = () => props.history.replace('/checkout/contact-data');
	
	const redirect = props.ings ? null : 
			<Redirect from='/checkout' exact to='/' />;
	const checkoutSummary = props.ings ? 
			<CheckoutSummary 
				ingredients={props.ings} 
				continue={continueHandler} 
				cancel={cancelHandler}/> : null;
	return (
		<div>
			{redirect}
			{checkoutSummary}
			<Route 
				path={props.match.path + '/contact-data'} 
				component={ContactData} />	
		</div>
	);
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients
	};
}

export default connect(mapStateToProps)(Checkout);