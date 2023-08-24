import { Component, Input, forwardRef } from '@angular/core';
import { getFormControl } from '../../../utils/form.utils';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ISelectItem } from '../../../interfaces/input.interface';
import { IValidationMessage } from '../../../interfaces/validation-message.interface';
import { MultiSelectChangeEvent } from 'primeng/multiselect';

@Component({
	selector: 'app-select-multiple',
	templateUrl: './select-multiple.component.html',
	styleUrls: ['./select-multiple.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectMultipleComponent),
			multi: true,
		},
	],
})
export class SelectMultipleComponent implements ControlValueAccessor {
	@Input() name!: string;
	@Input() label!: string;
	@Input() placeholder!: string;
	@Input() items!: ISelectItem[];

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Input() validationMessages!: IValidationMessage;

	value!: string;
	disabled!: boolean;

	selectedItem: ISelectItem | undefined;

	onChanged!: (selectedItem: ISelectItem) => void;
	onTouched!: () => void;

	selectionChanged(event: MultiSelectChangeEvent) {
		if (event.value) {
			this.onChanged(event.value);
		}

		this.onTouched();
	}

	writeValue(selectedItem: ISelectItem): void {
		this.selectedItem = selectedItem;
	}

	registerOnChange(fn: (selectedItem: ISelectItem) => void): void {
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
