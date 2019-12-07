import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/';

const ContactData = props => {
	const [validationState, setValidationState] = useState({validation: true});
	const [contactState, setContactState] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name'
			},
			value: ''
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Address'
			},
			value: ''
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Zipcode'
			},
			value: ''
		},
		email:{
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Your Email'
			},
			value: ''
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{value: 'fastest', displayValue: 'Fastest'},
					{value: 'cheapest', displayValue: 'Cheapest'}
				]
			},
			value: 'fastest'
		}
	});

	const changeHandler = (key, event) => {
		// deep clone
		const newContactState = JSON.parse(JSON.stringify(contactState));
		newContactState[key].value = event.target.value;
		setContactState(newContactState);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		if(checkValidation()) {
			setValidationState({validation: true});
			const formData = {};
			for(let key in contactState) {
				if(key !== 'deliveryMethod') formData[key] = contactState[key].value;
			}
			const order = {
				ingredients: props.ings,
				price: props.price,
				customer: formData,
				deliveryMethod: contactState['deliveryMethod'].value,
				userId: props.userId
			}
			props.onOrderBurger(order, props.token);
		} else {
			setValidationState({validation: false});
		}
	}

	const checkValidation = () => {
		return (contactState.name.value && 
				contactState.street.value && 
				contactState.zipCode.value && 
				contactState.email.value);
	}

	const input = [];

	for(let key in contactState) {
		input.push(<Input 
					key={key}  
					{...contactState[key]} 
					change={changeHandler} 
					name={key} />);
	}

	const form = props.loading ? <Spinner /> :
		<form onSubmit={submitHandler}>
			{input}
			<Button btnType='Success'>ORDER</Button>
		</form>

	const validation = validationState.validation ? null : 
						<div style={{color: 'red'}}>
							Please input all information!
						</div>;

	const error = props.error ? <p style={{color: 'red'}}>Cannot submit the data!</p> : null;

	const redirect = props.purchaseFinished ? 
		<Redirect from='/checkout/contact-data' exact to='/' /> : null;
		
	return (
		<div className={classes.ContactData}>
			{error}
			{redirect}
			<h4>Enter your Contact Data</h4>
			{validation}
			{form}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.price,
		loading: state.orders.loading,
		error: state.orders.error,
		purchaseFinished: state.orders.purchaseFinished,
		token: state.auth.token,
		userId: state.auth.userId
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));