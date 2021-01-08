/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState, useRef } from 'react';
import { TaskCard, } from '../';
import ListActions from '../actions';
import CreateForm from '../../create-form';
import Emoji from '../../emoji';
import api from '../../../api';
import './style.scss';

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
	const [isDisabled, setIsDisabled] = useState(true);
	const [isSelected, setIsSelected] = useState([]);

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

	const updateTask = async (changeState = false, ref = null, setSaveButton = null) => {

		if (changeState) {
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
				}

				// Toggle done state
				listObject.done = listObject.done === 0 ? 1 : 0;

				// Return promise array
				return await api(
					'update',
					{
						table,
						...listObject,
					}
				);
			});

			// Wait for all objects to finish
			await Promise.all(selected);

			// Run finalize action function
			finalizeAction();

		} else {
			setSaveButton(true);
			ref.current.contentEditable = true;
		}
	}

	const saveTask = async (taskId, title, description, setSaveButton) => {
		const currTitle = title.current;
		const currDescription = description.current;

		const newTitle = currTitle.innerHTML;
		const newDescription = currDescription.innerHTML;

		currTitle.contentEditable = false;
		currDescription.contentEditable = false;
		setSaveButton(false);

		await api(
			'update',
			{
				table,
				id: taskId,
				title: newTitle,
				description: newDescription,
			}
		);
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
			setIsSelected(isSelected.filter(object => object.id !== cardId));
		}
	}

	const selectList = (e) => {
		// Reset selected items
		setIsSelected([]);

		// Get id value from element
		const selected = e.target.options[e.target.selectedIndex].value;

		// Get lists
		const lists = taskLists.current.childNodes;

		// Handle cards in list(s)
		const handleListCards = (list) => {
			const cards = Array.from(list.childNodes);

			// Remove first index (h1) from list
			cards.shift();

			cards.forEach(card => {
				// Get first index (input type=checkbox)
				const inputCheck = card.childNodes[0];
				inputCheck.checked = true;
				// Run select function for card
				selectCard(inputCheck);

			});
		}

		lists.forEach(list => {
			if (selected !== 'both') {
				// Handle not both option

				// Define list to work with
				const selectedList = list.id.indexOf(selected) !== -1 && list;

				if (selectedList) {
					handleListCards(selectedList);
				}
			} else {
				handleListCards(list);
			}
		});
	}

	return (
		<>
			<ListActions props={{
				isDisabled,
				createNew,
				updateTask,
				deleteTask,
				selectList,
				toDoList,
				doneList
			}} />
			<div ref={taskLists} id="tasks">
				<section id="tasks-todo">
					<h1>To do <Emoji props={{ label: 'nerd', emoji: '🤓' }} /></h1>
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
											isSelected,
											selectCard,
											updateTask,
											saveTask,
										}}
									/>
								);
							})
							:
							<CreateForm props={{
								table,
								id: listId,
								setCreateForm,
								refresh: getTasks,
							}} />
					}
				</section>
				<section id="tasks-done">
					<h1>Done <Emoji props={{ label: 'star-struck', emoji: '🤩' }} /></h1>
					{
						doneList && doneList.length > 0 &&
						doneList.map((task, i) => {
							return (
								<TaskCard
									key={`task-done-${task.id}-${i}`}
									props={{
										task,
										isSelected,
										selectCard,
										updateTask,
										saveTask,
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