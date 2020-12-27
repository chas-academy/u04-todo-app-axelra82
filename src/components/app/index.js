/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState, useEffect } from 'react';
import Context from '../../context';
import { withRouter } from "react-router-dom";
import Routes from '../../routes';
import axios from 'axios';
import { parseJwt } from '../../helpers';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Modal from '../../components/modal';

export default withRouter(() => {
	const [context, setContext] = useState({
		configured: false,
		appUser: 'dodoUser',
		user: false,
		userId: null,
		username: null,
		modal: {
			login: false,
			signup: false,
			open: false,
		}
	});

	// Run once initially using empty array
	useEffect(() => {
		const initConfigured = async () => {
			const getConfigured = await axios('/configured.json');
			const configureData = getConfigured.data;
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
				configured: configureData.configured,
				user,
				userId,
				username,
			});
		}
		initConfigured();
	}, []);

	return (
		<Context.Provider value={[context, setContext]}>
			{
				context.modal.open &&
				<Modal />
			}
			{context.configured &&
				<Header />
			}
			<main id="main-container">
				<Routes />
			</main>
			{context.configured &&
				<Footer />
			}
		</Context.Provider>
	);
});