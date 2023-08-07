import { FormControl, FormGroup } from '@angular/forms';
import { ToastComponent } from '../components/toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

export function openSnackBar(
	_snackBar: MatSnackBar,
	message: string,
	panelClass: string,
) {
	_snackBar.openFromComponent(ToastComponent, {
		duration: 2000,
		horizontalPosition: 'right',
		verticalPosition: 'top',
		panelClass,
		data: {
			message,
		},
	});
}
