/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context';
import { UserLogin, UserSignup } from '../user';
import './style.scss';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

	const [context, setContext] = useContext(Context);
	const [closing, setClosing] = useState(!context.modal.open);
	const [loginState, setLoginState] = useState(false);
	const [signupState, setSignupState] = useState(false);

	const closeModal = (e) => {
		e.preventDefault();
		setClosing(true);
		setTimeout(() => {
			setContext(state => ({
				...state,
				modal: {
					login: loginState,
					signup: signupState,
					open: false,
				}
			}));
		}, 350);
	}

	// Close on escape key press
	useEffect(() => {
		const escFunction = (e) => {
			if (e.keyCode === 27) {
				closeModal(e);
			}
		}
		document.addEventListener('keydown', escFunction);
	}, [])

	return (
		<>
			<div id="overlay-box" className={closing ? 'closing' : ''}>
				<section className="form-box">
					{context.modal.signup &&
						<UserSignup props={{ closeModal, setSignupState }} />
					}
					{context.modal.login &&
						<UserLogin props={{ closeModal, setLoginState }} />
					}
				</section>
			</div>
			<div
				id="overlay"
				className={closing ? 'closing' : ''}
				onClick={closeModal}
			></div>
		</>
	);
};