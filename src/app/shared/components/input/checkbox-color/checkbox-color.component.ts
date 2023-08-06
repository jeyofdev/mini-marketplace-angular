/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'app-checkbox-color',
	templateUrl: './checkbox-color.component.html',
	styleUrls: ['./checkbox-color.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxColorComponent),
			multi: true,
		},
	],
})
export class CheckboxColorComponent implements ControlValueAccessor {
	@Input() label!: string;
	@Input() name!: string;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Input() color!: { color: string; label: string };

	isDisabled!: boolean;
	value!: boolean;

	changed!: (value: boolean) => void;
	onTouched!: () => void;

	writeValue(value: boolean): void {
		this.value = value;
	}

	onChange(event: Event): void {
		const checked: boolean = (<HTMLInputElement>event.target).checked;

		this.changed(checked);
	}

	registerOnChange(fn: any): void {
		this.changed = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	get formControl() {
		return this.getFormControl();
	}

	private getFormControl(): FormControl {
		if (this.groupName) {
			const group = this.groupName.slice(0, this.groupName.length - 4);
			const control = this.parentForm.controls[group].get(this.name);

			return control as FormControl;
		} else {
			return this.parentForm.get(this.name) as FormControl;
		}
	}
}
