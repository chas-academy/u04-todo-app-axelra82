/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../../context';

export default () => {
	const [context] = useContext(Context);

	return (
		<>
			<h1>Welcome {context.username}</h1>
			<p>That's all she wrote</p>
			<Link to="/">Home</Link>
		</>
	);
}