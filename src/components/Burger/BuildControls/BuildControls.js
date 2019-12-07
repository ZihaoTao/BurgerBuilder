import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'
import { withRouter } from 'react-router-dom';
const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const buildControls = props => {
	const button = 
		<button 
			className={classes.OrderButton} 
			onClick={props.purchasing} 
			disabled={!props.purchasable}>
			{props.token ? 'ORDER NOW' : 'SIGNUP TO ORDER'}
		</button>;
		
	return (
		<div className={classes.BuildControls}>
			<p>Current Price: <strong>$ {props.totalPrice.toFixed(2)}</strong></p>
			{controls.map(ctrl => <BuildControl 
					key={ctrl.label} 
					label={ctrl.label} 
					type={ctrl.type} 
					click={props.click}
					disabled={props.disabled[ctrl.type]} />
			)}
			{button}
		</div>);
}

export default withRouter(buildControls);