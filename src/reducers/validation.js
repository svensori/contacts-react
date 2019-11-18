import { VALIDATION } from '../constants/constants';

export default function validationReducer(state, action) {
	let validation = {...state};
	switch(action.type) {
		case 'firstName': 
			validation.firstName = action.value.length ? [] : VALIDATION.firstName;
			break;
		case 'lastName':
			validation.lastName = action.value.length ? [] : VALIDATION.lastName;
			break;
		case 'email':
			validation.email = action.value.length ? [] : VALIDATION.email;
			break;
		case 'phone':
			validation.phone = action.value.length ? [] : VALIDATION.phone;
			break;
		case 'reset':
			validation = VALIDATION;
			break;
		case 'clear':
			Object.keys(validation).forEach(key => validation[key] = '');
			break;
		default:
			break;
	}
	return validation;
}