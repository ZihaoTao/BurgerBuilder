import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = props => {
	const show = props.show ? classes['Open'] : classes['Close'];
	return (
		<Aux>
			<Backdrop show={props.show} click={props.click}/>
			<div className={[classes.SideDrawer, show].join(' ')} >
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer; 