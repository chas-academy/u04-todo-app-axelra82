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
		} else {
			// No list(s) reset taskList
			setTaskList([]);
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
	const editList = (e, listId, listName) => {
		e.preventDefault();
		alert(`edit list ${listName} (id: ${listId})`);
	}

	const deleteList = async (e, listId, listName) => {
		e.preventDefault();
		// Let user knnow action can't be undone
		const confirmDelete = window.confirm(`This will delete the list '${listName}' and all tasks in it. This action can not be undone.`);

		if (confirmDelete) {
			const response = await api(
				'delete',
				{
					table: 'lists',
					ids: listId
				}
			);

			if (response.success) {
				getLists();
			} else {
				alert(response.message);
			}
		}

	}

	useEffect(() => {
		lists && getTasks(lists);
	}, [lists]);

	useEffect(() => {
		userId && getLists();
	}, [userId]);

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
									<a href="#" onClick={(e) => editList(e, id, title)}>Edit</a>
									<a href="#" onClick={(e) => deleteList(e, id, title)}>Delete</a>
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