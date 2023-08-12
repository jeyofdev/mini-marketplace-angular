import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IValidationMessage } from '../../../interfaces/validation-message.interface';
import { getFormControl } from '../../../utils/form.utils';
import { Observable } from 'rxjs';

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
	@Input() hidePassword!: boolean;

	@Input() showPasswordEqualError!: Observable<boolean>;
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

		this.endIcon =
			this.type === 'password' && !this.hidePassword
				? 'pi pi-eye-slash'
				: 'pi pi-eye';

		this.class = this.type === 'password' ? 'p-input-icon-right' : '';
	}

	shownPassword(): void {
		this.hidePassword = !this.hidePassword;
		this.endIcon =
			this.type === 'password' && !this.hidePassword
				? 'pi pi-eye-slash'
				: 'pi pi-eye';
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
