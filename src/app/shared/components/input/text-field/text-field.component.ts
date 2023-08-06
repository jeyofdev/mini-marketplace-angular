/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { IValidationMessage } from '../../../interfaces/validation-message.interface';
import { getFormControl } from '../../../utils/form.utils';

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
	@Input() type!: 'text' | 'password' | 'textarea' | 'number';
	@Input() appearance!: 'outline' | 'fill';
	@Input() name!: string;
	@Input() label!: string;
	@Input() rows!: number;
	@Input() placeholder!: string;
	@Input() endIcon!: boolean;
	@Input() hidePassword!: boolean;

	@Input() showPasswordError!: Observable<boolean>;
	@Input() validationMessages!: IValidationMessage;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	isDisabled!: boolean;
	value!: string | number;

	changed!: (value: string) => void;
	onTouched!: () => void;

	finalType!: 'text' | 'password';

	ngOnInit(): void {
		this.finalType =
			this.type === 'text' || !this.hidePassword ? 'text' : 'password';
	}

	shownPassword(): void {
		this.hidePassword = !this.hidePassword;
	}

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
