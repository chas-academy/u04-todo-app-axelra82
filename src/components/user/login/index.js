import React, { useState, useContext } from 'react';
import Context from '../../../context';
import api from '../../../api';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	const [context, setContext] = useContext(Context);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();
		// Set username and password for login action
		try {
			const response = await api(
				'login',
				{
					username,
					password
				}
			);

			if (response.success) {
				// localStorage.setItem(context.appUser, JSON.stringify(response.message));
				setContext({
					...context,
					user: true,
					username: username,
				});
			} else {
				alert(response.message);
			}
		} catch (err) {
			alert(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<label htmlFor="username">Username: </label>
			<input
				autoFocus
				type="text"
				value={username}
				placeholder="username"
				onChange={({ target }) => setUsername(target.value)}
			/>
			<div>
				<label htmlFor="password">password: </label>
				<input
					type="password"
					value={password}
					placeholder="password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);
}