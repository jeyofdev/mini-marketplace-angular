import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
	selector: 'app-number-field-with-button',
	templateUrl: './number-field-with-button.component.html',
	styleUrls: ['./number-field-with-button.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NumberFieldWithButtonComponent),
			multi: true,
		},
	],
})
export class NumberFieldWithButtonComponent implements ControlValueAccessor {
	@Input() name!: string;
	@Input() label!: string;
	@Input() buttonLayout!: 'horizontal' | 'vertical';
	@Input() inputId!: string;
	@Input() itemNumber!: number;

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
}
