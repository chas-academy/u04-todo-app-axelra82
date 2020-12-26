/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../../context';
import api from '../../../api';
import { TaskList } from '../../../components/tasks';
import CreateForm from '../../../components/create-form';

export default () => {
	const [context] = useContext(Context);
	const titleRef = useRef();
	const descriptionRef = useRef();
	const userId = context.userId;
	const [lists, setLists] = useState([]);
	const [taskList, setTaskList] = useState([]);
	const [createForm, setCreateForm] = useState(false);
	const [saveButton, setSaveButton] = useState(false);
	const [listTitle, setListTitle] = useState('');

	const getTasks = async () => {

		if (lists.length) {
			const getListTasks = lists.map(async list => {
				const { id, title, description } = list;
				setListTitle(title);
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

	const createList = async (el) => {
		el.preventDefault();
		setCreateForm(true);
	}
	const editList = (ref) => {
		setSaveButton(true);
		ref.current.contentEditable = true;
	}

	const saveList = async (listId, title, description) => {
		const currTitle = title.current;
		const currDescription = description.current;

		const newTitle = currTitle.innerHTML;
		const newDescription = currDescription.innerHTML;

		currTitle.contentEditable = false;
		currDescription.contentEditable = false;

		setListTitle(newTitle);
		setSaveButton(false);

		await api(
			'update',
			{
				table: 'lists',
				id: listId,
				title: newTitle,
				description: newDescription,
			}
		);
	}

	const deleteList = async (el, listId, listName) => {
		el.preventDefault();
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
								<h1
									ref={titleRef}
									onClick={() => editList(titleRef)}
								>
									{listTitle}
								</h1>
								<div className="user-list-actions">
									<button onClick={(el) => deleteList(el, id, title)}>Delete {listTitle}</button>
								</div>
							</div>
							<p
								ref={descriptionRef}
								className="user-list-description mb-2"
								onClick={() => editList(descriptionRef)}
							>
								{description}
							</p>
							{saveButton &&
								<button onClick={() => saveList(id, titleRef, descriptionRef)}>save</button>
							}
							{tasks}
						</article>
					);
				})
				}

			</div>
		</>
	);
}