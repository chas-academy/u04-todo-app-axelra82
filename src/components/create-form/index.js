/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import api from '../../api';
import { IconAdd } from '../icons';
import './style.scss';

export default ({
	props: {
		table,
		id,
		setCreateForm,
		refresh,
	}
}) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [errorCheck, setErrorCheck] = useState({
		title: false,
		description: false,
	});

	const createTask = async (e) => {
		e.preventDefault();

		if (!validateInput()) {
			return;
		}

		const response = await api(
			'create',
			{
				table,
				id,
				title,
				description
			}
		);

		// Close form on create success
		if (response.success) {
			setCreateForm(false);
			refresh();
		} else {
			alert(`${response.message}`)
		}
	}

	const validateInput = () => {
		if (!title || !description) {

			if (!title) {
				setErrorCheck(state => ({
					...state,
					title: true
				}));
				console.log('missing title');
			}

			if (!description) {
				setErrorCheck(state => ({
					...state,
					description: true
				}));
				console.log('missing description');
			}
			console.log(errorCheck);
			// Can't continue, missing data
			return false;
		}
		return true;
	}

	const titleChange = (e) => {
		const elVal = e.target.value;
		const elName = e.target.name;
		setTitle(elVal);
		setErrorCheck(state => ({
			...state,
			[elName]: false
		}));
	}

	const descriptionChange = (e) => {
		const elVal = e.target.value;
		const elName = e.target.name;
		setDescription(elVal);
		setErrorCheck(state => ({
			...state,
			[elName]: false
		}));
	}

	return (
		<form id="create-task-form" name="user-create-list">
			<label htmlFor="title">Title</label>
			<input
				autoFocus
				aria-invalid={errorCheck.title}
				type="text"
				id="title"
				name="title"
				value={title}
				placeholder="Give it a title"
				onChange={titleChange}
			/>
			{errorCheck.title &&
				<p>
					<i className="text-small text-danger">Title is required</i>
				</p>
			}

			<label htmlFor="description">Description</label>
			<textarea
				aria-invalid={errorCheck.description}
				id="description"
				name="description"
				value={description}
				placeholder="Be descriptive"
				onChange={descriptionChange}
			/>
			{errorCheck.description &&
				<p>
					<i className="text-small text-danger">Description is required</i>
				</p >
			}

			<button
				className="icon create-task"
				onClick={createTask}
				type="submit"
			>
				<IconAdd />
			</button>
		</form>
	);
}