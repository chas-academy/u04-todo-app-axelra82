/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import api from '../../../api';
import { TaskList } from '../../../components/tasks';

export default () => {
	const [tasks, setTasks] = useState(false);

	// Used to refresh task lists
	const getTasks = async () => {
		const response = await api('task-read');
		console.log(response);
		setTasks(response.data);
		return;
	}

	// Run once initially using empty array
	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div className="container">
			<TaskList props={{ tasks, getTasks }} />
		</div>
	);
}