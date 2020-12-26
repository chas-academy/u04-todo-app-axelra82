// Deconstruct token payload
const parseJwt = (token) => {
	// This would be a good place to think about validating
	// the token but since this task is about backend for
	// todo I feel like the current setup is more than enough
	// ...
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

export {
	parseJwt
}