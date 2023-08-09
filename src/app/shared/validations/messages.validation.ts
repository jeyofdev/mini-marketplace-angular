export const addCategoryValidationMessages = {
	name: {
		required: { message: 'This field is required' },
		minlength: {
			message: 'This field must contain at least 3 characters',
			value: 3,
		},
		maxlength: {
			message: 'This field must contain a maximum of 30 characters',
			value: 30,
		},
	},
	description: {
		minlength: {
			message: 'This field must contain at least 5 characters',
			value: 5,
		},
	},
};

export const addProductValidationMessages = {
	brandName: {
		required: { message: 'This field is required' },
		minlength: {
			message: 'This field must contain at least 3 characters',
			value: 3,
		},
		maxlength: {
			message: 'This field must contain a maximum of 30 characters',
			value: 30,
		},
	},
	modelName: {
		required: { message: 'This field is required' },
		minlength: {
			message: 'This field must contain at least 3 characters',
			value: 3,
		},
		maxlength: {
			message: 'This field must contain a maximum of 30 characters',
			value: 30,
		},
	},
	category: {
		required: { message: 'A category must be selected' },
	},
	sizes: {
		required: { message: 'A size must be selected' },
	},
	price: {
		required: { message: 'This field is required' },
	},
};
