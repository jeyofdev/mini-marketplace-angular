/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

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
