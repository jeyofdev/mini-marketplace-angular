/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { getFormControl } from '../../../utils/form.utils';

@Component({
	selector: 'app-slider-with-value',
	templateUrl: './slider-with-value.component.html',
	styleUrls: ['./slider-with-value.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SliderWithValueComponent),
			multi: true,
		},
	],
})
export class SliderWithValueComponent implements OnInit, ControlValueAccessor {
	@Input() label!: string;
	@Input() name!: string;
	@Input() min!: number;
	@Input() max!: number;
	@Input() step!: number;
	@Input() disabled!: boolean;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	isDisabled!: boolean;
	value!: number;

	changed!: (value: string) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.value = 1;
	}

	writeValue(value: number): void {
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
