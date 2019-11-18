import React, { useEffect, useState } from 'react';
import { List } from 'react-virtualized';
import AutoSizer from 'react-virtualized-auto-sizer';

import { FILTER_TYPES, SORT_TYPES } from '../constants/constants';
import Contact from './Contact';

const ContactList = props => {
	const [contactList, setContactList] = useState(props.contactList);

	useEffect(() => {
		const handleSearch = (c) => {
			const keywords = JSON.stringify({
				key: [c.firstName + ' ' + c.lastName, c.email, c.address, c.occupation, c.company, c.phone]
			});
			const reference = keywords.toLowerCase();
			return reference.includes(props.searchValue.toLowerCase());
		}
		const handleFilter = (c) => props.filterType === FILTER_TYPES.STARED ? c.stared : true;
		const handleSort = (c1, c2) => {
			let a, b;

			switch (props.sortType) {
				case SORT_TYPES.NAME:
					a = c1.firstName + ' ' + c1.lastName;
					b = c2.firstName + ' ' + c2.lastName;
					break;

				case SORT_TYPES.COMPANY:
					a = c1.company;
					b = c2.company
					break;

				case SORT_TYPES.EMAIL:
					a = c1.email;
					b = c2.email;
					break;

				case SORT_TYPES.OCCUPATION:
					a = c1.occupation;
					b = c2.occupation;
					break;

				default:
					a = c1.id;
					b = c2.id;
					break;
			}

			if (a > b) return 1;
			if (a < b) return -1;
			return 0;
		}
		setContactList(props.contactList.filter(handleSearch).filter(handleFilter).sort(handleSort));
	}, [props])

	const renderRow = ({ index, key, style }) => {
		return (
			<div key={key} style={style}>
				<Contact
					key={contactList[index].id}
					data={contactList[index]}
					markStared={props.fn.markStared}
					handleDelete={props.fn.handleDelete}
					toggleEditMode={props.fn.toggleEditMode}
				/>
			</div>
		);
	}

	return (
		<AutoSizer>
			{
				({ width, height }) => (
					<List
						width={width}
						height={height}
						rowHeight={151}
						rowRenderer={renderRow}
						rowCount={contactList.length}
					/>
				)
			}
		</AutoSizer>
	)
}

export default ContactList
