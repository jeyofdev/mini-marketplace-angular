export interface IInputComplexItem {
	name: string;
	value: string;
	label: string;
}

export type ChoiceItemType = Pick<
	IInputComplexItem,
	'name' | 'value' | 'label'
> & {
	id?: string;
};

export type ColorItemType = Pick<
	IInputComplexItem,
	'name' | 'value' | 'label'
> & {
	id?: string;
	color: string;
	severity:
		| 'primary'
		| 'success'
		| 'info'
		| 'warning'
		| 'danger'
		| 'secondary'
		| 'help';
};
