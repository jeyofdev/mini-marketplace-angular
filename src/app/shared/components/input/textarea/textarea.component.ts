/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, forwardRef } from '@angular/core';
import { IValidationMessage } from '../../../interfaces/validation-message.interface';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { getFormControl } from '../../../utils/form.utils';

@Component({
	selector: 'app-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaComponent),
			multi: true,
		},
	],
})
export class TextareaComponent implements ControlValueAccessor {
	@Input() name!: string;
	@Input() label!: string;
	@Input() rows!: number;
	@Input() placeholder!: string;
	@Input() validationMessages!: IValidationMessage;
	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	isDisabled!: boolean;
	value!: string | number;

	changed!: (value: string) => void;
	onTouched!: () => void;

	writeValue(value: string): void {
		this.value = value;
	}

	onChange(event: Event): void {
		const value: string = (<HTMLInputElement>event.target).value;
		this.changed(value);
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
