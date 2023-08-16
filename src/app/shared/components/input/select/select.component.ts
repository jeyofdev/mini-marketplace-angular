/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ISelectItem } from '../../../interfaces/input.interface';
import { getFormControl } from '../../../utils/form.utils';
import { IValidationMessage } from '../../../interfaces/validation-message.interface';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
	],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
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
	showClear!: boolean;

	onChanged!: (selectedItem: ISelectItem) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.showClear = false;
	}

	selectionChanged(event: DropdownChangeEvent) {
		if (event.value) {
			this.showClear = true;
			this.onChanged(event.value);
		} else {
			this.showClear = false;
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
