import React, { useReducer, useState, useEffect } from 'react'

import { INITIAL_FORM_VALUES, VALIDATION, LOCAL_STORAGE_KEYS } from '../constants/constants';
import validationReducer from '../reducers/validation';

import './ContactForm.scss';

const getFormValues = () => {
	let formVal = INITIAL_FORM_VALUES;

	if (localStorage.getItem(LOCAL_STORAGE_KEYS.PERSIST) === 'true') {
		formVal = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.FORM));
	} else {
		localStorage.setItem(LOCAL_STORAGE_KEYS.FORM, '');
		localStorage.setItem(LOCAL_STORAGE_KEYS.PERSIST, '');
	}

	return formVal;
}

const ContactForm = ({ isEditMode, handleAdd, handleEdit, data }) => {
	const [validation, dispatch] = useReducer(validationReducer, VALIDATION);
	const [formValues, setFormValues] = useState(getFormValues);

	useEffect(() => {
		if (data) {
			setFormValues(data);
			dispatch({ type: 'clear' });
		} else {
			if (localStorage.getItem(LOCAL_STORAGE_KEYS.PERSIST) !== 'true') {
				resetForm();
			}
		}
	}, [data]);

	const dispatchInput = (e) => {
		const action = {
			type: e.target.name,
			value: e.target.value
		}
		dispatch(action);

		setFormValues(formValues => {
			const newFormValues = Object.assign({}, formValues);
			newFormValues[action.type] = action.value;

			// Save form data to local storage
			localStorage.setItem(LOCAL_STORAGE_KEYS.FORM, JSON.stringify(newFormValues));
			localStorage.setItem(LOCAL_STORAGE_KEYS.PERSIST, true);

			return newFormValues;
		})
		
	}

	const onSubmit = (e) => {
		e.preventDefault();
		
		if (isFormValid()) {
			isEditMode ? handleEdit(data.id, formValues) : handleAdd(formValues);
			resetForm();
			localStorage.setItem(LOCAL_STORAGE_KEYS.PERSIST, false);
		}
	}

	const resetForm = () => {
		setFormValues(INITIAL_FORM_VALUES);
		dispatch({ type: 'reset' });
	}

	const isFormValid = () => {
		let isValid = true;
		
		Object.keys(formValues).forEach(key => {
			dispatch({
				type: key,
				value: formValues[key]
			}); 
		})
		
		Object.values(validation).forEach(error => {
			if (error.length) {
				isValid = false;
			}
		})

		return isValid;
	}

	return (
		<div id="form-wrap">
			<h3 className="title is-4">{isEditMode ? 'Edit' : 'Add'} Contact</h3>
			<div className="notification is-link">
				<div className="help">Fields highlighted in blue are required.</div>
			</div>
			<form onSubmit={onSubmit}>
				<div className="columns">
					<div className="column is-half">
						<div className="field">
							<label className="label">First Name</label>
							<div className="control">
								<input
									className={`input ${formValues.firstName ? 'is-success' : 'is-info'}`}
									type="text"
									name="firstName"
									value={formValues.firstName}
									placeholder={validation.firstName}
									onChange={dispatchInput} />
							</div>
						</div>
					</div>
					<div className="column is-half">
						<div className="field">
							<label className="label">Last Name</label>
							<div className="control">
								<input
									className={`input ${formValues.lastName ? 'is-success' : 'is-info'}`}
									type="text"
									name="lastName"
									value={formValues.lastName}
									placeholder={validation.lastName}
									onChange={dispatchInput} />
							</div>
						</div>
					</div>
				</div>
				<div className="field">
					<label className="label">Address</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="address"
							value={formValues.address}
							placeholder="Current Address"
							onChange={dispatchInput} />
					</div>
				</div>
				<div className="field">
					<label className="label">Occupation</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="occupation"
							value={formValues.occupation}
							placeholder="Current Occupation"
							onChange={dispatchInput} />
					</div>
				</div>
				<div className="field">
					<label className="label">Company</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="company"
							value={formValues.company}
							placeholder="Current Company"
							onChange={dispatchInput} />
					</div>
				</div>
				<div className="field">
					<label className="label">Email</label>
					<div className="control">
						<input
							className={`input ${formValues.email ? 'is-success' : 'is-info'}`}
							type="email"
							name="email"
							value={formValues.email}
							placeholder={validation.email}
							onChange={dispatchInput} />
					</div>
				</div>
				<div className="field">
					<label className="label">Contact Number</label>
					<input
						className={`input ${formValues.phone ? 'is-success' : 'is-info'}`}
						type="text"
						name="phone"
						value={formValues.phone}
						placeholder={validation.phone}
						onChange={dispatchInput} />
				</div>
				<div className="field is-grouped">
					<p className="control">
						<button className="button is-primary">Save</button>
					</p>
				</div>
			</form>
		</div>
	);
}

export default ContactForm



