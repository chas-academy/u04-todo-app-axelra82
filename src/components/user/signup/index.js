/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useContext } from 'react';
import Context from '../../../context';
import api from '../../../api';

export default () => {
	const [context, setContext] = useContext(Context);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

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
			localStorage.setItem(context.appUser, JSON.stringify(response.data));
			setContext({
				...context,
				user: true,
			});
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