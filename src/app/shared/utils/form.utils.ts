/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, FormGroup } from '@angular/forms';

export function getFormControl(
	groupName: string,
	parentForm: FormGroup,
	name: string,
): AbstractControl<any, any> | null {
	if (groupName) {
		const group = groupName.slice(0, groupName.length - 4);
		const control = parentForm.controls[group].get(name);

		return control;
	} else {
		return parentForm.get(name);
	}
}
