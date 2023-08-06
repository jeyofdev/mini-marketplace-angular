/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { getFormControl } from '../../../utils/form.utils';

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
		return getFormControl(this.groupName, this.parentForm, this.name);
	}
}
