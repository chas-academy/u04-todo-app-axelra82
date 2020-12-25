/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../../context';
import api from '../../../api';

export default () => {
	const [context, setContext] = useContext(Context);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const handleSubmit = async e => {
		e.preventDefault();

		const response = await api(
			'signup',
			{
				username,
				password
			}
		);
		console.log(response);
		if (response.success) {
			// Persist signup/login
			localStorage.setItem(context.appUser, JSON.stringify(response.data.token));
			setContext({
				...context,
				user: true,
				username: response.data.username,
			});
			// Change route to user page
			history.push("/user");
		} else {
			alert(response.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Signup</h1>
			<label htmlFor="username">Select username: </label>
			<input
				autoFocus
				type="text"
				value={username}
				placeholder="username"
				onChange={({ target }) => setUsername(target.value)}
			/>
			<div>
				<label htmlFor="password">Set a password: </label>
				<input
					type="password"
					value={password}
					placeholder="password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">signup</button>
		</form>
	);
}