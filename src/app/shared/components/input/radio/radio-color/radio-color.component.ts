import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { getFormControl } from '@shared/utils/form.utils';
import { ColorItemType } from '@shared/interfaces/input.interface';

@Component({
	selector: 'app-radio-color',
	templateUrl: './radio-color.component.html',
	styleUrls: ['./radio-color.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioColorComponent),
			multi: true,
		},
	],
})
export class RadioColorComponent implements OnInit, ControlValueAccessor {
	@Input() isChecked!: boolean;
	@Input() item!: ColorItemType;
	@Input() name!: string;
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

	styleClass!: string;
	borderClass!: string;

	onChanged!: (value: string) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.setStyleClass();
	}

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

	private setStyleClass(): void {
		this.styleClass = '';

		if (this.color) {
			this.styleClass += `p-radiobutton-${this.color} `;
		}
	}
}
