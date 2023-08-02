/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

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
	@Input() appearance!: 'outline' | 'fill';
	@Input() name!: string;
	@Input() label!: string;
	@Input() hidePassword!: boolean;
	@Input() endIcon!: boolean;
	@Input() parentForm!: FormGroup;

	isDisabled!: boolean;
	value!: string;

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
}
