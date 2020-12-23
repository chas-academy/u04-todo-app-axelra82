/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState, useRef } from 'react';
import { TaskCard, } from '../';
import ListActions from '../actions';
import CreateForm from '../../create-form';

export default ({
	props: {
		tasks,
		getTasks,
		listId = null,
	}
}) => {
	const [toDoList, setToDoList] = useState([]);
	const [doneList, setDoneList] = useState([]);
	const taskLists = useRef(null);
	const [createForm, setCreateForm] = useState(false);
	const table = 'tasks';

	// Set lists 
	useEffect(() => {
		tasks && setToDoList(tasks.todo);
		tasks && setDoneList(tasks.done);
	}, [tasks])

	// Show create form
	const createNew = () => {
		setCreateForm(true);
	}

	return (
		<>
			<ListActions props={{
				createNew,
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