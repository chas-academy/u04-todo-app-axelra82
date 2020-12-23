/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default ({
	props: {
		createNew,
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
			</ul>
		</div>
	);
}