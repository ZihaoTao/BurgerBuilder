import * as actionTypes from '../actions/actionTypes';

const initState = {
	ingredients: null,
	price: 4,
	purchasable: false,
	error: false,
	building: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_INGREDIENT:
			const addPrice = INGREDIENT_PRICES[action.ingredientName];
			const value = state.ingredients[action.ingredientName] + (action.isAdded ? 1 : -1);
			const price = state.price + (action.isAdded ? addPrice : -addPrice);
			const res = {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: value
				},
				building: true,
				price: price
			};
			const sum = Object.keys(res.ingredients)
							.map(igKey => {
								return res.ingredients[igKey];
							})
							.reduce((sum, el) => {
								return sum + el;
							}, 0);
			return {
				...res,
				purchasable: sum > 0
			}
		case actionTypes.SET_INGREDIENT:
			let totalPrice = 4;
			for(let key in action.ingredients) {
				totalPrice += action.ingredients[key] * INGREDIENT_PRICES[key];
			}
			return {
				...state,
				ingredients: {
					salad:  action.ingredients.salad,
					bacon:  action.ingredients.bacon,
					cheese:  action.ingredients.cheese,
					meat:  action.ingredients.meat
				},
				price: totalPrice,
				error: false
			}
		case actionTypes.FETCH_INGREDIENT_FAILED:
			return {
				...state,
				error: true
			}
		default:
			return state;
	}
}

export default reducer;