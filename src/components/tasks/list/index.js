/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState, useRef } from 'react';
import { TaskCard, } from '../';
import ListActions from '../actions';
import CreateForm from '../../create-form';
import api from '../../../api';

export default ({
	props: {
		tasks,
		getTasks,
		listId = null,
	}
}) => {
	const [toDoList, setToDoList] = useState([]);
	const [doneList, setDoneList] = useState([]);
	const [createForm, setCreateForm] = useState(false);
	const [isSelected, setIsSelected] = useState([]);
	const [isDisabled, setIsDisabled] = useState(true);
	const taskLists = useRef(null);
	const table = 'tasks';

	useEffect(() => {
		tasks && setToDoList(tasks.todo);
		tasks && setDoneList(tasks.done);
	}, [tasks])

	// Toggle disabled attribute for multi-action buttons
	useEffect(() => {
		isSelected.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
	}, [isSelected]);

	// Used to finialize actions
	const finalizeAction = (action = null) => {
		// Animate card out
		isSelected.forEach(object => {
			const card = object.card;
			card.classList.add('animate-out');

			if (action === 'delete') {
				setTimeout(() => {
					// Wait for animation to finish
					// then set display none for node element
					object.card.style.display = 'none';
				}, 350);
			}
		});

		setTimeout(async () => {
			// Reset selected items
			setIsSelected([]);

			// Re-render tasks
			getTasks();
		}, 350);
	}

	const createNew = () => {
		setCreateForm(true);
	}

	const updateTask = async () => {

		// Map selected array with promise array returned
		const selected = isSelected.map(async (object) => {
			let listObject;
			switch (object.list) {
				case 'todo':
					listObject = toDoList.find(listObject => listObject.id === object.id);
					break;
				case 'done':
					listObject = doneList.find(listObject => listObject.id === object.id);
					break;

				default:
					listObject = false;
					break;
			}

			// Toggle done state
			listObject.done = listObject.done === 0 ? true : false;

			console.log(listObject);
			console.log(table);
			// Return promise array
			return await api(
				'update',
				{
					...listObject,
					table
				}
			);
		});

		// Wait for all objects to finish
		await Promise.all(selected);

		// Run finalize action function
		finalizeAction();
	}

	const deleteTask = () => {
		// Create array with ids from selected objects
		const ids = isSelected.map(obj => obj.id);

		// Convert array to string with commas using join
		// and run deleted action
		api(
			'delete',
			{
				table,
				ids
			}
		);

		// Run finalize action function
		finalizeAction('delete');
	}

	const selectCard = (e) => {
		const isChecked = e.checked;
		const cardId = e.id;
		const cardEl = e.parentNode;
		const list = cardEl.parentNode.id.replace(/tasks-/gm, '');

		if (isChecked) {
			// Add ID to array
			setIsSelected(selected => [
				...selected,
				{
					id: cardId,
					list: list,
					card: cardEl,
				}

			]);
		} else {
			// Set checkbox to checked = false
			// e.checked = false;
			setIsSelected(isSelected.filter(object => object.id !== cardId));
		}
	}

	return (
		<>
			<ListActions props={{
				isDisabled,
				createNew,
				updateTask,
				deleteTask
			}} />
			<div ref={taskLists} id="tasks">
				<section id="tasks-todo">
					<h1>To do</h1>
					{createForm &&
						<CreateForm props={{
							table,
							id: listId,
							setCreateForm,
							refresh: getTasks,
						}} />
					}
					{
						toDoList && toDoList.length > 0 ?
							toDoList.map((task, i) => {
								return (
									<TaskCard
										key={`task-todo-${task.id}-${i}`}
										props={{
											task,
											selectCard
										}}
									/>
								);
							})
							:
							<>No tasks</>
					}
				</section>
				<section id="tasks-done">
					<h1>Done</h1>
					{
						doneList && doneList.length > 0 &&
						doneList.map((task, i) => {
							return (
								<TaskCard
									key={`task-done-${task.id}-${i}`}
									props={{
										task,
										selectCard
									}}
								/>
							);
						})
					}
				</section>
			</div>
		</>
	);
}