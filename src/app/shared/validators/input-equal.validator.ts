import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function inputEqualValidator(
	main: string,
	confirm: string,
): ValidatorFn {
	return (ctrl: AbstractControl): null | ValidationErrors => {
		if (!ctrl.get(main) || !ctrl.get(confirm)) {
			return {
				confirmEqual: 'invalid control names',
			};
		}

		const mainValue = ctrl.get(main)?.value;
		const confirmValue = ctrl.get(confirm)?.value;

		if (mainValue === confirmValue) {
			return null;
		}

		return {
			confirmEqual: {
				main: mainValue,
				confirm: confirmValue,
			},
		};
	};
}
