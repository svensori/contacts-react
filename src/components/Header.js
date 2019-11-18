import React from 'react';

import { FILTER_TYPES, SORT_TYPES } from '../constants/constants';

import './Header.scss';

const Header = ({ title, total, filterType, fn }) => {
	return (
		<div id="header-menu">
			<div className="tags has-addons">
				<span className="tag is-info is-large">{title}</span>
				<span className="tag is-primary">v1.0.0</span>
			</div>
			<h2 className="subtitle is-6">A simple contact list application made in React.</h2>
			<nav className="level">
				<div className="level-left">
					<div className="level-item">
						<p className="subtitle is-4">
							<strong>{total}</strong> Records
						</p>
					</div>
					<div className="level-item">
						<input
							className="input"
							type="text"
							placeholder="Search for name, company, position, etc."
							onChange={e => {fn.search(e.target.value)}} />
					</div>
				</div>

				<div className="level-right">
					<div className="level-item">
						<div className="control">
							<div className="select">
								<select
									name="sortBy"
									defaultValue={-1}
									onChange={e => fn.sort(e.target.value)}>
									<option value="-1" disabled>Sort By</option>
									<option value={SORT_TYPES.DEFAULT}>Default</option>
									<option value={SORT_TYPES.NAME}>Name</option>
									<option value={SORT_TYPES.COMPANY}>Company</option>
									<option value={SORT_TYPES.EMAIL}>Email</option>
									<option value={SORT_TYPES.OCCUPATION}>Occupation</option>
								</select>
							</div>
						</div>
					</div>
					<div className="level-item">
						<button
							className={`button ${filterType === FILTER_TYPES.ALL ? 'is-primary' : 'is-secondary'}`}
							value="all"
							onClick={e => fn.filter(e.target.value)}>All
						</button>
					</div>
					<div className="level-item">
						<button
							className={`button ${filterType === FILTER_TYPES.STARED ? 'is-primary' : 'is-secondary'}`}
							value="stared"
							onClick={e => fn.filter(e.target.value)}>Stared
						</button>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Header
