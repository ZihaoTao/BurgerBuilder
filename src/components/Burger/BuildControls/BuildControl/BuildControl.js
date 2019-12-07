import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = props => {
	return (
		<div className={classes.BuildControl}>
			<div className={classes.Label}>{props.label}</div>
			<button 
				className={classes.Less} 
				onClick={() => props.click(props.type, false)}  
				disabled={props.disabled}>
					Less
			</button>
			<button 
				className={classes.More} 
				onClick={() => props.click(props.type, true)}>
					More
			</button>
		</div>
	);
};

export default buildControl;
