/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import api from '../../../api';
import { TaskList } from '../../../components/tasks';
import { UserSignup, UserLogin } from '../../../components/user';
import Context from '../../../context';

export default () => {
	const [context, setContext] = useContext(Context);
	const [tasks, setTasks] = useState(false);
	const history = useHistory();
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

	const logout = () => {
		setContext({
			...context,
			user: false,
		});
		localStorage.removeItem(context.appUser);
		history.push("/");
	}
	return (
		<div className="container">
			<TaskList props={{ tasks, getTasks }} />
			{context.user ?
				<>
					<button onClick={logout}>
						Log out
					</button>
					<Link to="/user">User</Link>
				</>
				:
				<>
					<UserSignup />
					<UserLogin />
				</>
			}
		</div>
	);
}