import { Directive, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { getFormControl } from '@shared/utils/form.utils';
import { RadioButtonClickEvent } from 'primeng/radiobutton';

@Directive()
export abstract class AbstractFormRadio<T>
	implements OnInit, ControlValueAccessor
{
	@Input() name!: string;
	@Input() label!: string;
	@Input() isChecked!: boolean;
	@Input() item!: T;
	@Input() hasBorder!: boolean;
	@Input() color!:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'info'
		| 'help';
	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	value!: string;
	disabled!: boolean;
	borderClass!: string;

	onChanged!: (value: string) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.disabled = false;
		this.setBorderClass();
	}

	abstract onInputChange(event: RadioButtonClickEvent): void;

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

	get control() {
		return getFormControl(this.groupName, this.parentForm, this.name);
	}

	protected setBorderClass(): void {
		this.borderClass = 'border';

		if (this.color) {
			this.borderClass += ` border-${this.color}`;
		}
	}
}
