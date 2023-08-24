import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { ChoiceItemType } from '../../../../interfaces/input.interface';
import { getFormControl } from '../../../../utils/form.utils';

@Component({
	selector: 'app-radio-square',
	templateUrl: './radio-square.component.html',
	styleUrls: ['./radio-square.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioSquareComponent),
			multi: true,
		},
	],
})
export class RadioSquareComponent implements OnInit, ControlValueAccessor {
	@Input() item!: ChoiceItemType;
	@Input() name!: string;
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

		if (this.value === this.item.value) {
			this.styleClass += `p-radiobutton-bg-${this.color}`;
		}
	}
}
