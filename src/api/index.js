/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
import axios from 'axios';

export default async (
	endpoint = null,
	data = null,
) => {

	// Init let vars
	let endpointLocation,
		response;

	// Endpoint case switch
	switch (endpoint) {
		case 'configure':
			endpointLocation = 'Configure/Init.php';
			break;
	}

	try {

		// Set up API request
		const options = {
			url: `http://${data.host}:${data.port}/backend/API/Endpoint/${endpointLocation}`,
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