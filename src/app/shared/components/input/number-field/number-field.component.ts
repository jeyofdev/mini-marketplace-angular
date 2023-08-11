/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Component,
	EventEmitter,
	Input,
	Output,
	forwardRef,
} from '@angular/core';
import { IValidationMessage } from '../../../interfaces/validation-message.interface';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { getFormControl } from '../../../utils/form.utils';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
	selector: 'app-number-field',
	templateUrl: './number-field.component.html',
	styleUrls: ['./number-field.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NumberFieldComponent),
			multi: true,
		},
	],
})
export class NumberFieldComponent implements ControlValueAccessor {
	@Input() name!: string;
	@Input() label!: string;

	@Input() validationMessages!: IValidationMessage;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

	isDisabled!: boolean;
	value!: number;

	changed!: (value: number) => void;
	onTouched!: () => void;

	writeValue(value: number): void {
		this.value = value;
	}

	onChanged(event: InputNumberInputEvent): void {
		const value = Number(event.value);
		this.changed(value);
	}

	registerOnChange(fn: any): void {
		this.changed = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	get formControl() {
		return getFormControl(this.groupName, this.parentForm, this.name);
	}
}
