import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = props => {
	let transformedIngrediens = Object.keys(props.ingredients).map(igKey => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key={igKey + i} type={igKey} />;
		});
	}).reduce((arr, el) => arr.concat(el), []);

	if(transformedIngrediens.length === 0) {
		transformedIngrediens = <p>Please start adding ingredients!</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top'/>
				{transformedIngrediens}
			<BurgerIngredient type='bread-bottom'/>
		</div>
	);
};

export default burger;