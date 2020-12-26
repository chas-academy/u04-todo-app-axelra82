/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../../context';
import api from '../../../api';
import { TaskList } from '../../../components/tasks';
import CreateForm from '../../../components/create-form';

export default () => {
	const [context] = useContext(Context);
	const [lists, setLists] = useState([]);
	const [taskList, setTaskList] = useState([]);
	const [createForm, setCreateForm] = useState(false);
	const userId = context.userId;
	useEffect(() => {
		console.log(context);
		console.log(userId);
	}, [])
	const getTasks = async () => {

		if (lists.length) {
			const getListTasks = lists.map(async list => {
				const { id, title, description } = list;
				const response = await api(
					'read',
					{
						table: 'tasks',
						ids: id,
					}
				);
				return {
					id,
					title,
					description,
					tasks: <TaskList props={{
						tasks: response.data,
						getTasks,
						listId: id,
					}} />
				};
			});
			const allListTasks = await Promise.all(getListTasks);

			setTaskList(allListTasks);
		}
		return;
	}

	const getLists = async () => {
		if (userId) {
			const response = await api(
				'read',
				{
					table: 'lists',
					ids: userId,
				}
			);
			setLists(response.data);
		}
		return;
	}

	const createList = async (e) => {
		e.preventDefault();
		setCreateForm(true);
	}

	useEffect(() => {
		lists && getTasks(lists);
	}, [lists]);

	useEffect(() => {
		getLists();
	}, []);

	return (
		<>
			<Link to="/">Home</Link>
			<div className="container">
				<div id="user-list-main-title">
					<h1>Welcome {context.username}</h1>
					{lists.length ?
						<a className="text-small" href="#" onClick={createList}>Create another list</a>
						:
						<>
							<p>Create your first list</p>
							<CreateForm props={{
								table: 'lists',
								id: context.userId,
								setCreateForm,
								refresh: getLists,
							}} />
						</>
					}
				</div>

				{createForm &&
					<CreateForm props={{
						table: 'lists',
						id: context.userId,
						setCreateForm,
						refresh: getLists,
					}} />
				}

				{taskList && taskList.map(list => {
					const { id, title, description, tasks } = list;
					return (
						<article key={`task-list-${id}`} className="user-list">
							<div className="user-list-top-section">
								<h1>{title}</h1>
								<div className="user-list-actions text-small">
									<span className="text-muted">{title} options</span>
									{/* <a href="#" onClick={(e) => editList(e, id)}>Edit</a> */}
									{/* <a href="#" onClick={(e) => deleteList(e, id, title)}>Delete</a> */}
								</div>
							</div>
							<p className="user-list-description mb-2">{description}</p>
							{tasks}
						</article>
					);
				})
				}

			</div>
		</>
	);
}