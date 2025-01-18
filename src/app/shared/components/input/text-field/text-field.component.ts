import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IValidationMessage } from '@shared/interfaces/validation-message.interface';
import { getFormControl } from '@shared/utils/form.utils';

@Component({
	selector: 'app-text-field',
	templateUrl: './text-field.component.html',
	styleUrls: ['./text-field.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextFieldComponent),
			multi: true,
		},
	],
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
	@Input() type!: 'text' | 'password';
	@Input() name!: string;
	@Input() label!: string;
	@Input() endIcon!: string;

	@Input() validationMessages!: IValidationMessage;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	class!: string;
	value!: string;
	disabled!: boolean;

	onChanged!: (value: string) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.disabled = false;

		this.class = this.endIcon ? 'p-input-icon-right' : '';
	}

	onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		this.onChanged(this.value);
	}

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: (value: string) => void): void {
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
