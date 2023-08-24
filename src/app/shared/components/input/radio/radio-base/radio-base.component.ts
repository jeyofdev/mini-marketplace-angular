import { Component, Input, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { IRadioButtonItem } from '../../../../interfaces/input.interface';
import { getFormControl } from '../../../../utils/form.utils';

@Component({
	selector: 'app-radio-base',
	templateUrl: './radio-base.component.html',
	styleUrls: ['./radio-base.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioBaseComponent),
			multi: true,
		},
	],
})
export class RadioBaseComponent implements ControlValueAccessor {
	@Input() item!: IRadioButtonItem;
	@Input() name!: string;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	value!: string;
	disabled!: boolean;

	onChanged!: (value: string) => void;
	onTouched!: () => void;

	selectionChanged(event: RadioButtonClickEvent) {
		this.onChanged(event.value);
		this.onTouched();
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

	get formControl() {
		return getFormControl(this.groupName, this.parentForm, this.name);
	}
}
