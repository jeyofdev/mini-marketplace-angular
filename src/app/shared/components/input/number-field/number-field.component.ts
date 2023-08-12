import { Component, Input, forwardRef } from '@angular/core';
import { IValidationMessage } from '../../../interfaces/validation-message.interface';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { getFormControl } from '../../../utils/form.utils';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
	selector: 'app-number-field',
	templateUrl: './number-field.component.html',
	styleUrls: ['./number-field.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NumberFieldComponent),
			multi: true,
		},
	],
})
export class NumberFieldComponent implements ControlValueAccessor {
	@Input() name!: string;
	@Input() label!: string;

	@Input() validationMessages!: IValidationMessage;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	disabled!: boolean;
	value!: number;

	onChanged!: (value: number) => void;
	onTouched!: () => void;

	onInputNumberChange(event: InputNumberInputEvent): void {
		if (this.disabled) {
			return;
		}

		this.value = Number(event.value);
		this.onChanged(this.value);
	}

	writeValue(value: number): void {
		this.value = value;
	}

	registerOnChange(fn: (value: number) => void): void {
		this.onChanged = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	markAsTouched(): void {
		this.onTouched();
	}

	get control() {
		return getFormControl(this.groupName, this.parentForm, this.name);
	}
}
