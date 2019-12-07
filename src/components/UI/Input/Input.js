import React from 'react';
import classes from './Input.module.css';

const input = props => {
	let inputElemtent = null;
	switch (props.elementType) {
		case ('input'):
			inputElemtent = <input 
								className={classes.InputElement} 
								{...props.elementConfig} 
								onChange={(event) => props.change(props.name, event)} />
			break;
		case ('textarea'):
			inputElemtent = <textarea 
								className={classes.InputElement} 
								{...props.elementConfig} 
								onChange={(event) => props.change(props.name, event)} />
			break;
		case ('select'):
			const options = props.elementConfig.options
							.map((el, index) => 
								<option 
									key={index} 
									value={el.value}>
									{el.displayValue}
								</option>);
			inputElemtent = <select 
								className={classes.Select} 
								onChange={(event) => props.change(props.name, event)}>
								{options}
							</select>
			break;
		default:
			inputElemtent = <input 
								className={classes.InputElement} 
								{...props.elementConfig} 
								onChange={(event) => props.change(props.name, event)} />
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElemtent}
		</div>
	);
}

export default input;