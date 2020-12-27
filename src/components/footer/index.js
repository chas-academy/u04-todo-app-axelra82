import React from 'react';
import Emoji from '../emoji';
import './style.scss';

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
	<>
		<article id="howto" className="container">
			<h1>How To</h1>
			<p>
				Click the <strong>"new"</strong> button to create a new to do card.
			</p>

			<p>
				To delete or mark one or more cards as done, select the card(s) by clicking on the circle in the upper right corner for every card you want to select.
			</p>

			<p>
				Once you have selected one or more card(s) the action buttons on top will be enabled and you will have the options to mark as <strong>"done"</strong> or <strong>"delete"</strong>.
			</p>

			<p>
				If you want to select multiple cards at once you can use the <strong>"select list" drop-down</strong>. It will allow you to select all cards in any list that has cards.
			</p>

			<p>
				<strong>NOTES:</strong>
			</p>
			<ul>
				<li>
					Deleting a card is permanent and can't be undone. You will <strong>not be prompted</strong> to delete a card.
					</li>
				<li>
					Selecting one or more cards in the "done" list and clicking "done" will bring them back to "to do".
					</li>
				<li>
					The <strong>select-list dropdown</strong> does not toggle selection(s), e.g. if you have selected all cards in "to do" and select "to do" in the drop-down it will not deselect those cards in "to do".
					</li>
			</ul>

		</article>
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
	</>