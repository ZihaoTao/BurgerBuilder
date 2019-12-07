import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const [showState, setShowState] = useState({
			error: null
		});
		
		const reqInterceptor = axios.interceptors.request.use(req => {
					setShowState({error: null});
					return req;
				});

		const resInterceptor = axios.interceptors.response.use(res => res, error => {
			setShowState({error: error});
		});

		useEffect(() => {
			return () => {
				axios.interceptors.request.eject(reqInterceptor);
				axios.interceptors.response.eject(resInterceptor);
			};
		}, [reqInterceptor, resInterceptor]);

		const errorConfirmedHandler = () => {
			setShowState({error: null});
		};

		return (
			<Aux>
				<Modal show={showState.error} click={errorConfirmedHandler}>
					{showState.error ? showState.error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Aux>
		);
	};
};											
export default withErrorHandler;