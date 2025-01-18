import { Component, Input, forwardRef } from '@angular/core';
import { getFormControl } from '@shared/utils/form.utils';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IValidationMessage } from '@shared/interfaces/validation-message.interface';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { ChoiceItemType } from '@shared/interfaces/input.interface';

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
	@Input() items!: ChoiceItemType[];

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Input() validationMessages!: IValidationMessage;

	value!: string;
	disabled!: boolean;

	selectedItem: ChoiceItemType | undefined;

	onChanged!: (selectedItem: ChoiceItemType) => void;
	onTouched!: () => void;

	selectionChanged(event: MultiSelectChangeEvent) {
		if (event.value) {
			this.onChanged(event.value);
		}

		this.onTouched();
	}

	writeValue(selectedItem: ChoiceItemType): void {
		this.selectedItem = selectedItem;
	}

	registerOnChange(fn: (selectedItem: ChoiceItemType) => void): void {
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
