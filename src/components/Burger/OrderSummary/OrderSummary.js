import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'; 

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients)
									.map(igKey =>
									 	<li key={igKey}>
											<span style={{textTransform: 'capitalize'}}>
										   		{`${igKey}: ${props.ingredients[igKey]}`}
										   	</span>
									    </li>);
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredient: </p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
			<p>Continue to Checkout?</p>
			<Button click={props.cancel} btnType='Danger'>CANCEL</Button>
			<Button click={props.continue} btnType='Success'>CONTINUE</Button>
		</Aux>
	);
};

export default orderSummary;