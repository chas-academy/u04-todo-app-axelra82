/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default ({
	props: {
		isDisabled,
		createNew,
		updateTask,
		deleteTask,
		selectList,
		toDoList,
		doneList
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

				<li>
					<select defaultValue="DEFAULT" onChange={selectList}>
						<option
							value="DEFAULT"
							defaultValue disabled
						>
							Select list
									</option>
						<option
							disabled={toDoList && toDoList.length > 0 ? false : true}
							value="todo">
							To do
									</option>
						<option
							disabled={doneList && doneList.length > 0 ? false : true}
							value="done"
						>
							Done
									</option>
						<option
							disabled={
								(toDoList && toDoList.length > 0) &&
									(doneList && doneList.length > 0)
									? false : true}
							value="both">
							Both
									</option>
					</select>
				</li>

			</ul>
		</div>
	);
}