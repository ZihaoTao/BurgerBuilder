import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/';

const BurgerBuilder = props => {
	const [purchasingState, setPurchasingState] = useState({purchasing: false});

	useEffect(() => {
		if(!props.building) props.onIngredientInit()
		props.onAuthLoading();
	}, [])

	const purchaseHandler = () => {
		if (props.token) setPurchasingState({purchasing: true});
		else props.history.push('/auth');
	}

	const purchaseCancelHandler = () => setPurchasingState({purchasing: false});

	const purchaseContinueHandler = () => props.history.push({pathname:'/checkout'});

	const disableInfo = {...props.ings};

	for(let key in disableInfo) 
		disableInfo[key] = disableInfo[key] <= 0;

	const orderSummary = !props.ings ? <Spinner /> : 
					<OrderSummary 
						totalPrice={props.price} 
						ingredients={props.ings} 
						cancel={purchaseCancelHandler} 
						continue={purchaseContinueHandler}/>;

	let burger = props.ings ? 
				<Aux>
					<Burger ingredients={props.ings} />
					<BuildControls 
						click={props.onIngredientUpdate} 
						disabled={disableInfo} 
						totalPrice={props.price} 
						purchasable={props.purchasable}
						purchasing={purchaseHandler}
						token={props.token}
						/>
				</Aux> : <Spinner />;

	if (props.error) burger = <p>Cannot get data!</p>

	return (
		<Aux>
			<Modal show={purchasingState.purchasing} click={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.price,
		purchasable: state.burgerBuilder.purchasable,
		error: state.burgerBuilder.error,
		token: state.auth.token,
		building: state.burgerBuilder.building
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientUpdate: (ingName, isAdded) => dispatch(actions.updateIngredient(ingName, isAdded)),
		onIngredientInit: () => dispatch(actions.initIngredients()),
		onAuthLoading: () => dispatch(actions.authLoading())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));