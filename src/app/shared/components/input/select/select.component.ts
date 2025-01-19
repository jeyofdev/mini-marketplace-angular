import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { getFormControl } from '@shared/utils/form.utils';
import { IValidationMessage } from '@shared/interfaces/validation-message.interface';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { ChoiceItemType } from '@shared/interfaces/input.interface';

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
	@Input() items!: ChoiceItemType[];

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Input() validationMessages!: IValidationMessage;

	value!: string;
	disabled!: boolean;

	selectedItem: ChoiceItemType | undefined;
	showClear!: boolean;

	onChanged!: (selectedItem: ChoiceItemType) => void;
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
