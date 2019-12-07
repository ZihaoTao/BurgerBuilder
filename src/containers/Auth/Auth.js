import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/';
import Aux from '../../hoc/Aux';

const Auth = props => {
	const [signUpState, setSignUpState] = useState({isSignUp: true});
	const [controlState, setControlState] = useState({
		email: {
			elementype: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Mail Address'
			},
			value: '',
		},
		password: {
			elementype: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password'
			},
			value: ''
		}
	})

	const changeHandler = (key, event) => {
		// deep clone
		const newControlState = JSON.parse(JSON.stringify(controlState));
		newControlState[key].value = event.target.value;
		setControlState(newControlState);
	}

	const switchHandler = () => {
		const isSignUp = signUpState.isSignUp;
		setSignUpState({isSignUp: !isSignUp});
	}
	const submitHandler = (event) => {
		event.preventDefault();
		props.onAuth(controlState.email.value, controlState.password.value, signUpState.isSignUp);
	}

	const input = [];

	for(let key in controlState) {
		input.push(<Input 
					key={key}  
					{...controlState[key]}
					change={changeHandler} 
					name={key}/>);
	}
	
	const validation = props.error ? 
		<p style={{padding:'10px', color:'red'}}>{props.error.message}</p> : null;
	
	let redirect = null;
	
	if(props.token) {
		if (props.building) redirect = <Redirect to='/checkout' />;
		else redirect = <Redirect to='/' />;
	}


	const authContent = props.authStart ? <Spinner /> : 
			<Aux>
				{redirect}
				{validation}
				<form onSubmit={submitHandler}>
					{input}
					<Button btnType='Success'>{signUpState.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
				</form>
				<Button btnType='Danger' click={switchHandler}>SWITCH TO {signUpState.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
			</Aux>;

	return (
		<div className={classes.Auth}>
			{authContent}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		authStart: state.auth.authStart,
		error: state.auth.error,
		token: state.auth.token,
		building: state.burgerBuilder.building
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, pwd, isSignUp) => dispatch(actions.auth(email, pwd, isSignUp))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);