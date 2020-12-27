import React, { useContext } from 'react';
import { BrowserRouter as Router, useHistory, Link } from 'react-router-dom';
import { Link as SmoothScroll } from 'react-scroll';
import Dodo from '../../assets/graphics/dodo.svg';
import Context from '../../context';
import Emoji from '../emoji';
import './style.scss';

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable  import/no-anonymous-default-export */
export default () => {
	const [context, setContext] = useContext(Context);
	const history = useHistory();
	const goHome = () => history.push("/");
	const goUser = () => history.push("/user");

	const signup = (e) => {
		e.preventDefault();
		setContext({
			...context,
			modal: {
				...context.modal,
				signup: true,
				open: true,
			}
		});
	}

	const login = (e) => {
		e.preventDefault();
		setContext({
			...context,
			modal: {
				...context.modal,
				login: true,
				open: true,
			}
		});
	}

	const logout = (e) => {
		e.preventDefault();
		setContext({
			...context,
			user: false,
			username: null,
		});
		localStorage.removeItem(context.appUser);
		goHome();
	}

	return (
		<>
			<header id="main-header">

				<div className="container">
					<Router>
						<Link to="/" onClick={goHome}>
							<img src={Dodo} alt="To Do DoDo" />
						</Link>
					</Router>

					<article id="hint">
						<h1 className="text-regular m-0">
							Get <strong>CRUD<sup>*</sup></strong>ing
						</h1>
						<p className="text-tiny">
							<sup>*</sup>Create, Read, Update, Delete
						</p>

						{
							context.user ?
								<ul>
									<Router>
										<li>
											<Link to="/" onClick={goHome}>
												Unasigned tasks
										</Link>
										</li>
										<li>
											<Link to="/user" onClick={goUser}>
												My lists
										</Link>
										</li>
										<li>
											<Link to="/" onClick={logout}>
												Logout
										</Link>
										</li>
									</Router>
								</ul>
								:
								<>
									<p>
										<strong>Pssst... Power users <Emoji props={{ label: 'unicorn', emoji: '🦄' }} /></strong>
									</p>

									<ul>
										<Router>
											<li className="text-small">
												<Link to="/" onClick={signup}>
													create account
												</Link> to organize tasks in lists
											</li>

											<li className="text-small">
												<Link to="/user" onClick={login}>
													login
												</Link> to existing account
											</li>
										</Router>
									</ul>
								</>
						}
						<p className="mt-2">
							<SmoothScroll to="howto" smooth>How to</SmoothScroll>
						</p>
					</article>
				</div>
			</header>
		</>
	);
}