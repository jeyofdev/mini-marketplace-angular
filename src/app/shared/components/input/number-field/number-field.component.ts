import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { AbstractFormInput } from '@shared/utils/abstract-form-input';

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
export class NumberFieldComponent extends AbstractFormInput<number> {
	@Input() inputId!: string;
	@Input() mode!: 'decimal' | 'currency';
	@Input() currency!: 'EUR' | 'USD' | undefined;

	override onInputChange(event: InputNumberInputEvent): void {
		if (this.disabled) {
			return;
		}

		this.value = Number(event.value);
		this.onChanged(this.value);
	}
}
