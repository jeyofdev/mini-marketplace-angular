import { FormControl, FormGroup } from '@angular/forms';

export function getFormControl(
	groupName: string,
	parentForm: FormGroup,
	name: string,
): FormControl {
	if (groupName) {
		const group = groupName.slice(0, groupName.length - 4);
		const control = parentForm.controls[group].get(name);

		return control as FormControl;
	} else {
		return parentForm.get(name) as FormControl;
	}
}
