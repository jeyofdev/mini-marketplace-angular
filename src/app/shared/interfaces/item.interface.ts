export interface IColorItem {
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
