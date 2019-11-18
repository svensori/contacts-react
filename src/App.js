import React, { useState } from 'react';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Header from './components/Header';
import { APP_TITLE, FILTER_TYPES, SORT_TYPES } from './constants/constants';
import jsonData from './data/contactsHugeScale.json';

import './App.scss';

const App = () => {
	const title = APP_TITLE;
	const [contactList, setContactList] = useState(jsonData);
	const [searchValue, setSearchValue] = useState('');
	const [isEditMode, setIsEditMode] = useState(false);
	const [editableInfo, setEditableInfo] = useState({});
	const [filterType, setFilterType] = useState(FILTER_TYPES.DEFAULT);
	const [sortType, setSortType] = useState(SORT_TYPES.DEFAULT);

	/* DATA FUNCTIONS */
	const markStared = id => {
		setContactList(currentList => {
			return currentList.map(contact => {
				if (contact.id === id) {
					contact.stared = !contact.stared
				}

				return contact;
			})
		});
	}

	const handleDelete = id => {
		setContactList(currentList => {
			return currentList.filter(contact => contact.id !== id);
		});
	}

	const handleAdd = data => {
		const avatar = 'https://robohash.org/auterrorquia.jpg?size=50x50&set=set1';
		const id = createNewId();
		const payload = { id, avatar, ...data };
		setContactList(currentList => [...currentList, payload]);
	}

	const handleEdit = (id, formData) => {
		setContactList(currentList => {
			return currentList.map(contact => {
				if (id === contact.id) {
					contact.firstName = formData.firstName;
					contact.lastName = formData.lastName;
					contact.email = formData.email;
					contact.phone = formData.phone;
					contact.occupation = formData.occupation;
					contact.company = formData.company;
					contact.address = formData.address;
				}

				return contact;
			})
		})

		toggleEditMode();
	}

	/* FILTER FUNCTIONS */
	const search = searchString => {
		setSearchValue(searchString);
	}

	const filter = filterType => {
		setFilterType(filterType);
	}

	const sort = sortType => {
		setSortType(sortType);
	}

	const toggleEditMode = data => {
		setEditableInfo({ ...data });
		setIsEditMode(currentValue => !currentValue);
	}

	/* HELPER FUNCTIONS */
	const createNewId = () => {
		const contactIds = contactList.map(contact => contact.id);
		return Math.max(...contactIds) + 1;
	}

	/* RENDERERS */
	const renderEditForm = () => {
		return (
			<ContactForm
				isEditMode={isEditMode}
				handleEdit={handleEdit}
				data={editableInfo} />
		);
	}

	const renderAddForm = () => {
		return (
			<ContactForm
				isEditMode={isEditMode}
				handleAdd={handleAdd}
			/>
		);
	}

	/* RENDER JSX */
	return (
		<section id="contacts-app" className="section">
			<div className="container has-background-white">
				<div className="columns">
					<div className="column">
						<Header
							title={title}
							total={contactList.length}
							filterType={filterType}
							fn={{
								search,
								filter,
								sort
							}} />
					</div>
				</div>
				<div className="columns">
					<div className="column is-7">
						<ContactList
							contactList={contactList}
							searchValue={searchValue}
							filterType={filterType}
							sortType={sortType}
							fn={{
								markStared,
								handleDelete,
								toggleEditMode,
							}} />
					</div>
					<div className="column is-5 card">
						{
							isEditMode ? renderEditForm() : renderAddForm()
						}
					</div>
				</div>
			</div>
		</section>
	);
}

export default App;