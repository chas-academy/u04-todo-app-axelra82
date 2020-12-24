/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default ({
	props: {
		task,
		selectCard
	},
}) => {

	const {
		id,
		title,
		description,
		createdAt,
		updatedAt,
	} = task;

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

	return (
		<article className="task-card">
			<input
				id={id}
				type="checkbox"
				name={`card-${id}`}
				className="input-checkbox"
				onChange={(e) => selectCard(e.target)}
			/>

			<h1 className="title">
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
			<p className="description">
				{description}
			</p>
		</article>
	);
}