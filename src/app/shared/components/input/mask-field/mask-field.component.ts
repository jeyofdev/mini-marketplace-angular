import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormInput } from '@shared/utils/abstract-form-input';

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
export class MaskFieldComponent extends AbstractFormInput<string> {
	@Input() type!: string;
	@Input() mask!: string;

	override onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		this.onChanged(this.value);
	}
}
