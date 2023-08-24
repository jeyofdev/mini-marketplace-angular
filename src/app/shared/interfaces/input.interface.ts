export interface IInputComplexItem {
	name?: string;
	value: string;
	label: string;
}

export type ChoiceItemType = Pick<IInputComplexItem, 'value' | 'label'> & {
	id?: string;
};

export interface IColorCheckbox {
	color: string;
	label: string;
	name: string;
	severity:
		| 'primary'
		| 'success'
		| 'info'
		| 'warning'
		| 'danger'
		| 'secondary'
		| 'help';
}
