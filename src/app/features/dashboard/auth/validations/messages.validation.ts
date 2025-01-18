export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const registerValidationMessages = {
	firstname: {
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
	lastname: {
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
	username: {
		required: { message: 'This field is required' },
		minlength: {
			message: 'This field must contain at least 5 characters',
			value: 5,
		},
		maxlength: {
			message: 'This field must contain a maximum of 20 characters',
			value: 20,
		},
	},
	email: {
		required: { message: 'This field is required' },
		pattern: {
			regex: regexEmail,
			message: 'Your email is not in a valid format',
		},
	},
	password: {
		required: { message: 'This field is required' },
		minlength: {
			message: 'This field must contain at least 8 characters',
			value: 8,
		},
		maxlength: {
			message: 'This field must contain a maximum of 100 characters',
			value: 100,
		},
	},
	confirmPassword: {
		required: {
			message: 'This field is required',
		},
		minlength: {
			message: 'This field must contain at least 8 characters',
			value: 8,
		},
		maxlength: {
			message: 'This field must contain a maximum of 100 characters',
			value: 100,
		},
	},
	passwordEqual: {
		message: 'The Passwords must match',
	},
};

export const loginValidationMessages = {
	email: {
		required: { message: 'This field is required' },
		pattern: {
			regex: regexEmail,
			message: 'Your email is not in a valid format',
		},
	},
	password: {
		required: { message: 'This field is required' },
		minlength: {
			message: 'This field must contain at least 8 characters',
			value: 8,
		},
		maxlength: {
			message: 'This field must contain a maximum of 100 characters',
			value: 100,
		},
	},
};
