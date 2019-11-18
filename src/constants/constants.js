export const APP_TITLE = 'Contacts';

export const VALIDATION = {
	firstName: 'Please input First Name',
	lastName: 'Please input Last Name',
	email: 'Please input Email',
	phone: 'Please input Phone Number'
}

export const INITIAL_FORM_VALUES = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	occupation: '',
	company: '',
	address: '',
	stared: false
}

export const FILTER_TYPES = {
	DEFAULT: 'all',
	ALL: 'all',
	STARED: 'stared'
}

export const SORT_TYPES = {
	DEFAULT: 'default',
	NAME: 'name',
	EMAIL: 'email',
	COMPANY: 'company',
	OCCUPATION: 'occupation'
}

export const LOCAL_STORAGE_KEYS = {
	FORM: 'form',
	PERSIST: 'persist'
}