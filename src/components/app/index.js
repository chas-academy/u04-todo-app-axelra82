/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState, useEffect } from 'react';
import Context from '../../context';
import { withRouter } from "react-router-dom";
import Routes from '../../routes';
import axios from 'axios';

export default withRouter(() => {
	const [context, setContext] = useState({
		appUser: process.env.REACT_APP_APPNAME,
		user: false,
		userId: null,
		username: null,
	});

	// Run once initially using empty array
	useEffect(() => {
		const initConfigured = async () => {
			const getConfigured = await axios('/configured.json');
			const configured = getConfigured.data.configured;
			// Look for app user in local storage
			const jwt = localStorage.getItem(context.appUser);
			// Get timestamp in seconds
			const timestamp = Math.floor(Date.now() / 1000);
			// Found something
			let user = false,
				userId = null,
				username = null;
			if (jwt) {
				// This would be a good place to think about validating
				// the token but since this task is about backend for
				// todo I feel like the current setup is more than enough
				// ...
				// Deconstruct token payload
				const parseJwt = (token) => {
					// Get payload from token
					const base64 = token.split('.')[1];
					// Clean up
					const clean = base64.replace(/-/g, '+').replace(/_/g, '/');
					// Extract content
					const payload = decodeURIComponent(atob(clean).split('').map(function (c) {
						return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					}).join(''));
					// Return object
					return JSON.parse(payload);
				};
				const getPayload = parseJwt(jwt);
				const { exp: expires, userId: id, username: name } = getPayload;

				// If timestamp hasn't expired
				if (expires > timestamp) {
					// Valid session active
					user = true;
					userId = id;
					username = name;
				} else {
					// Session ended
					localStorage.removeItem(context.appUser);
				}
			}
			setContext({
				...context,
				configured,
				user,
				userId,
				username,
			});
		}
		initConfigured();
	}, []);

	return (
		<Context.Provider value={[context, setContext]}>
			<main id="main-container">
				<Routes />
			</main>
		</Context.Provider>
	);
});