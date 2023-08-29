import { Component, Input, forwardRef } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getFormControl } from 'src/app/shared/utils/form.utils';

@Component({
	selector: 'app-mask-field',
	templateUrl: './mask-field.component.html',
	styleUrls: ['./mask-field.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MaskFieldComponent),
			multi: true,
		},
	],
})
export class MaskFieldComponent {
	@Input() name!: string;
	@Input() label!: string;
	@Input() type!: string;
	@Input() mask!: string;
	@Input() placeholder!: string;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	disabled!: boolean;
	value!: string;

	onChanged!: (value: string) => void;
	onTouched!: () => void;

	onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		this.onChanged(this.value);

		this.onChanged(this.value);
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

	get control() {
		return getFormControl(this.groupName, this.parentForm, this.name);
	}
}
