import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { IValidationMessage } from '@shared/interfaces/validation-message.interface';
import { getFormControl } from '@shared/utils/form.utils';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Directive()
export abstract class AbstractFormCheckbox
	implements OnInit, ControlValueAccessor
{
	@Input() name!: string;
	@Input() label!: string;
	@Input() color!:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'info'
		| 'help';
	@Input() checkboxIcon!: string;
	@Input() validationMessages!: IValidationMessage;
	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	class!: string;
	checked!: boolean;
	borderClass!: string;
	disabled!: boolean;

	onChanged!: (checked: boolean) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.disabled = false;
		this.checked = false;
		this.setBorderClass();
	}

	abstract onInputChange(event: CheckboxChangeEvent): void;

	writeValue(checked: boolean): void {
		this.checked = checked;
	}

	registerOnChange(fn: (value: boolean) => void): void {
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
