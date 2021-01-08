/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useRef, useState } from 'react';
import CheckMark from './checkmark';
import './style.scss';

export default ({
	props: {
		task,
		isSelected,
		selectCard,
		updateTask,
		saveTask,
	},
}) => {

	const {
		id,
		title,
		description,
		createdAt,
		updatedAt,
	} = task;

	// States
	const [isChecked, setIsChecked] = useState(false);
	const [saveButton, setSaveButton] = useState(false);

	// Refs	
	const titleRef = useRef(null);
	const descriptionRef = useRef(null);

	// Date format function
	const formatDate = (date) => {

		// Fix missing T declaration
		const dateTime = new Date(date.replace(' ', 'T'));

		// Format according to en-US
		const options = {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		};

		// Return beautiful date
		return dateTime.toLocaleDateString("en-US", options);
	}

	useEffect(() => {
		isSelected.length && isSelected.forEach(e => {
			e.id === id && setIsChecked(true);
		});
	}, [isSelected])

	return (
		<article className="task-card">

			<input
				id={id}
				type="checkbox"
				name={`card-${id}`}
				className="input-checkbox"
				onChange={e => {
					selectCard(e.target);
					setIsChecked(e.target.checked);
				}}
			/>
			<CheckMark isChecked={isChecked} />

			<h1
				ref={titleRef}
				className="title"
				onClick={() => updateTask(false, titleRef, setSaveButton)}
			>
				{title}
			</h1>
			<p className="task-created">
				{createdAt === updatedAt ?
					<>
						created <time dateTime={createdAt}>{formatDate(createdAt)}</time>
					</>
					:
					<>
						updated < time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
					</>
				}
			</p>
			<p
				ref={descriptionRef}
				className="description"
				onClick={() => updateTask(false, descriptionRef, setSaveButton)}
			>
				{description}
			</p>
			{saveButton &&
				<button className="update-task" onClick={() => saveTask(id, titleRef, descriptionRef, setSaveButton)}>save</button>
			}
		</article>
	);
}