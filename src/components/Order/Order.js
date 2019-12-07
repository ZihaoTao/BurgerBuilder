import React from 'react';
import classes from './Order.module.css';

const order = props => {
	const ingredientsArray = [];

	for(let key in props.ingredients) {
		ingredientsArray.push({
			name: key,
			amount: props.ingredients[key]
		});
	}

	const ingredients = ingredientsArray.map(ig => {
		return <span 
				key={ig.name}
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '3px 4px',
					border: '1px solid #ccc',
					padding: '5px'
				}}>
				{ig.name} ({ig.amount})</span>
	})

	return (
		<div className={classes.Order}>
			<p>Ingredients: </p>
			<p>{ingredients}</p>
			<p>Price: ${props.price.toFixed(2)}</p>
			<p>Delivery Method: {props.deliveryMethod}</p>
		</div>
	);
};

export default order;