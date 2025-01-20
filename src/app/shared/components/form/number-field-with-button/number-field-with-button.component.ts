import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormInput } from '@shared/utils/abstract-form-input';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
	selector: 'app-number-field-with-button',
	templateUrl: './number-field-with-button.component.html',
	styleUrls: ['./number-field-with-button.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NumberFieldWithButtonComponent),
			multi: true,
		},
	],
})
export class NumberFieldWithButtonComponent extends AbstractFormInput<number> {
	@Input() buttonLayout!: 'horizontal' | 'vertical';
	@Input() inputId!: string;
	@Input() itemNumber!: number;

	onInputChange(event: InputNumberInputEvent): void {
		if (this.disabled) {
			return;
		}

		this.value = Number(event.value);
		this.onChanged(this.value);
	}
}
