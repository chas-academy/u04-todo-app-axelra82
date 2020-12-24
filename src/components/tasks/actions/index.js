/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default ({
	props: {
		isDisabled,
		createNew,
		updateTask,
		deleteTask,
	}
}) => {
	return (
		<div id="list-actions" className="mb-2">
			<ul>
				<li className="card-action">
					<button
						onClick={createNew}
						className="add-card"
					>
						New
					</button>
				</li>

				<li className="card-action">
					<button
						onClick={updateTask}
						className="update-card"
						disabled={isDisabled}
					>
						Done
					</button>
				</li>

				<li className="card-action">
					<button
						onClick={deleteTask}
						className="delete-card"
						disabled={isDisabled}
					>
						Delete
					</button>
				</li>

			</ul>
		</div>
	);
}