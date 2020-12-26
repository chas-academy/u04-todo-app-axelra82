/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import api from '../../../api';
import { TaskList } from '../../../components/tasks';

export default () => {

	const [tasks, setTasks] = useState(false);
	const table = 'tasks';

	// Used to refresh task lists
	const getTasks = async () => {
		const response = await api('read', { table });
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










// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { UserSignup, UserLogin } from '../../../components/user';
// import Context from '../../../context';
// const [context, setContext] = useContext(Context);
// const history = useHistory();
// const logout = () => {
// 	setContext({
// 		...context,
// 		user: false,
// 	});
// 	localStorage.removeItem(context.appUser);
// 	history.push("/");
// }
// <UserSignup />
// <UserLogin />
// <button onClick={logout}>Log out</button>
// <Link to="/user">User</Link>