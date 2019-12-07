import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import { connect } from 'react-redux';

const navigationItems = props => {
	const authItem = props.token ? <NavigationItem link='/logout'>Sign Out</NavigationItem>
			 : <NavigationItem link='/auth'>Sign In</NavigationItem>;
	const order = props.token ? <NavigationItem link='/orders'>Orders</NavigationItem> : null;

	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link='/burger-builder'>Burger Builder</NavigationItem>
			{order}
			{authItem}
		</ul>
	);
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(navigationItems);