export const addCategoryValidationMessages = {
	name: {
		required: { message: 'This field is required' },
		minlength: {
			message: 'This field must contain at least 3 characters',
			value: 3,
		},
		maxlength: {
			message: 'This field must contain a maximum of 30 characters',
			value: 20,
		},
	},
};
