export interface IValidationMessage {
	required?: IValidation;
	minlength?: IValidation;
	maxlength?: IValidation;
	pattern?: IValidation;
	min?: IValidation;
}

export interface IValidation {
	message: string;
	value?: number | string;
}
