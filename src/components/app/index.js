/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState, useEffect } from 'react';
import Context from '../../context';
import { withRouter } from "react-router-dom";
import Routes from '../../routes';
import axios from 'axios';

export default withRouter(() => {
	const [context, setContext] = useState({
		working: true,
	});

	// Run once initially using empty array
	useEffect(() => {
		const initConfigured = async () => {
			const getConfigured = await axios('/configured.json');
			const configured = getConfigured.data.configured;
			setContext({
				...context,
				working: false,
				configured,
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