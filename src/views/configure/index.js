/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import api from '../../api';

export default () => {

	const defaultHost = process.env.REACT_APP_HOST;
	const defaultPort = process.env.REACT_APP_PORT;
	const defaultUsername = process.env.REACT_APP_USERNAME;
	const defaultPassword = process.env.REACT_APP_PASSWORD;

	const [host, setHost] = useState(defaultHost);
	const [port, setPort] = useState(defaultPort);
	const [username, setUsername] = useState(defaultUsername);
	const [password, setPassword] = useState(defaultPassword);

	const inputChange = (e) => {
		const elVal = e.target.value;
		const elName = e.target.name;

		switch (elName) {
			case 'host':
				setHost(elVal);
				break;
			case 'port':
				setPort(elVal);
				break;
			case 'username':
				setUsername(elVal);
				break;
			case 'password':
				setPassword(elVal);
				break;
		}
	}

	const initConfigure = async (e) => {
		e.preventDefault();

		const response = await api(
			'configure',
			{
				host,
				port,
				username,
				password
			}
		);

		// If there are no errors page will refresh from
		// config file update in backend else show error(s)
		if (!response.success) {

			// Troubleshooting
			alert('Could not complete configuration. Se console log for details.');
			console.log('Make sure all database values are correct.');
			console.log('If error persists, try manual install as per "Manual installation" under How to in readme');
			console.log('––––––––––––––––––––––––––––––––');
			console.log(response.message);
		}
	}
	return (
		<article className="container">
			<h1>Welcome to DODO the To Do app!</h1>
			<p>Let's get you set up with a database for your to do tasks.</p>
			<form
				name="host-setup"
				onSubmit={initConfigure}
			>
				<label htmlFor="host">
					Host <span className="text-small text-light">(default: {defaultHost})</span>
				</label>
				<input
					type="text"
					id="host"
					name="host"
					placeholder={defaultHost}
					onChange={inputChange}
				/>

				<label htmlFor="port">
					Port <span className="text-small text-light">(default: {defaultPort})</span>
				</label>
				<input
					type="text"
					id="port"
					name="port"
					placeholder={defaultPort}
					onChange={inputChange}
				/>

				<label htmlFor="username">
					User <span className="text-small text-light">(default: {defaultUsername})</span>
				</label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder={defaultUsername}
					onChange={inputChange}
				/>

				<label htmlFor="password">
					Password <span className="text-small text-light">(default: {defaultPassword})</span>
				</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder={defaultPassword}
					onChange={inputChange}
				/>

				<button type="submit">Go</button>
			</form>
		</article>
	);
}