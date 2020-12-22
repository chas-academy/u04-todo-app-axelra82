/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
import axios from 'axios';

export default async (
	endpoint = null,
	data = {},
) => {

	// Init let vars
	let endpointLocation,
		response,
		endpointUrl;

	// Endpoint case switch
	switch (endpoint) {
		case 'configure':
			endpointLocation = 'Configure/Init.php';
			// Endpoint has unknown variables at this point
			// Use data object to build endpoint during configure
			endpointUrl = `http://${data.host}:${data.port}/backend/API/Endpoint/${endpointLocation}`
			break;
		case 'task-read':
			endpointLocation = 'Task/Read.php';
			break;
	}

	// Configured endpoint URL
	if (endpoint !== 'configure') {
		endpointUrl = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/backend/API/Endpoint/${endpointLocation}`
	}

	try {

		// Set up API request
		const options = {
			url: endpointUrl,
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json; charset=UTF-8',
			},
			data: data
		}

		// Await api response from request
		const request = await axios(options);
		// Success object
		request.data.data = typeof request.data.data !== "undefined" ?
			JSON.parse(request.data.data)
			:
			{};
		response = request.data

	} catch (error) {

		// Error object
		response = {
			success: false,
			message: error
		}
	}

	// Return response object
	return response;
}