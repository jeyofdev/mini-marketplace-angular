import { Directive, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { IValidationMessage } from '@shared/model/validation-message.interface';
import { getFormControl } from '@shared/utils/form.utils';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { SliderChangeEvent } from 'primeng/slider';

@Directive()
export abstract class AbstractFormInput<T>
	implements OnInit, ControlValueAccessor
{
	@Input() name!: string;
	@Input() label!: string;
	@Input() placeholder!: string;
	@Input() validationMessages!: IValidationMessage;
	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	class!: string;
	value!: T;
	disabled!: boolean;

	onChanged!: (value: T) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.disabled = false;
	}

	abstract onInputChange(
		event:
			| Event
			| InputNumberInputEvent
			| DropdownChangeEvent
			| MultiSelectChangeEvent
			| CheckboxChangeEvent
			| RadioButtonClickEvent
			| SliderChangeEvent,
	): void;

	writeValue(value: T): void {
		this.value = value;
	}

	registerOnChange(fn: (value: T) => void): void {
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
