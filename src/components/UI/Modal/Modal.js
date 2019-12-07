import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const modal = props => (
	<Aux>
		<Backdrop show={props.show} click={props.click} />
		<div 
			className={classes.Modal}
			style={{
				transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
				opacity: props.show ? 1 : 0
			}}>
			{props.children}
		</div>
	</Aux>
);

export default React.memo(modal,(prevProps, nextProps) => prevProps.show === nextProps.show && prevProps.children === nextProps.children);

