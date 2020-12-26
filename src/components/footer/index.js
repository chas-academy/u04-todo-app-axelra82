import React from 'react';
import Emoji from '../emoji';
import './style.scss';

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
	<footer id="main-footer" className="background-smoke">
		<div className="container text-small">
			<aside>
				<h3>
					Footnote
			</h3>
				<p className="mb-0">
					A chas academy assignment
				</p>
				<p>
					<strong>u04 - ToDo</strong>
				</p>
			</aside>

			<aside>
				<h3>
					Author
				</h3>
				<p className="mb-0">
					Axel Roussille Åberg
				</p>
				<p>
					&#64;<a href="https://82con.com">82 Consulting AB</a>
				</p>
			</aside>
			<aside>
				<h3>
					Nonsense
			</h3>
				<p>
					<strong>&copy; COPYWRIGHT</strong>, all rights reserved (<strong>or whatever</strong>). No tasks, lists, penns, coffee cups, screens, processors or clowns <Emoji props={{ label: 'clown', emoji: '🤡' }} /> were harmed during the making if this app (<strong>probably</strong>).
			</p>
			</aside>
		</div>
	</footer>