import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const updateIngredient = (name, isAdded) => {
	return {
		type: actionTypes.UPDATE_INGREDIENT,
		ingredientName: name,
		isAdded: isAdded
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENT,
		ingredients: ingredients
	};
};

export const initIngredients = () => {
	return dispatch => {
		axios.get('/ingredients.json')
			.then(res => {
				dispatch(setIngredients(res.data));
			})
			.catch(err => {
				dispatch(fetchIngredientsFailed());
			});
	}
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENT_FAILED,
	};
}  