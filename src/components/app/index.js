/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState, useEffect } from 'react';
import Context from '../../context';
import { withRouter } from "react-router-dom";
import Routes from '../../routes';
import axios from 'axios';
import { parseJwt } from '../../helpers';

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
				const { exp: expires, userId: id, username: name } = parseJwt(jwt);
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