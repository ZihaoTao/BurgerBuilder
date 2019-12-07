import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/ToolBar/ToolBar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
	const [sideDrawerState, setSideDrawerState] = useState({
		show: false
	});

	const clickHandler = () => {
		const curState = sideDrawerState.show;
		setSideDrawerState({show: !curState});
	}

	return (
		<Aux>
			<Toolbar click={clickHandler} />
			<SideDrawer click={clickHandler} show={sideDrawerState.show}/>
			<main className={classes.Content}>
				{props.children}
			</main>
		</Aux>
	); 
};

export default Layout;

