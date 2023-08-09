/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Component,
	EventEmitter,
	Input,
	Output,
	forwardRef,
} from '@angular/core';
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
export class SelectComponent implements ControlValueAccessor {
	@Input() label!: string;
	@Input() name!: string;
	@Input() placeholder!: string;
	@Input() items!: ISelectItem[];
	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;
	@Input() validationMessages!: IValidationMessage;

	@Output() valueChange: EventEmitter<any> = new EventEmitter<string>();

	value!: string;
	selectedItem: ISelectItem | undefined;

	onChanged!: (value: string) => void;
	onTouched!: () => void;

	selectionChanged(event: DropdownChangeEvent) {
		this.valueChange.emit(event.value);
		this.onChanged(event.value.value);
		this.onTouched();
	}

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChanged = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	get formControl() {
		return getFormControl(this.groupName, this.parentForm, this.name);
	}
}
