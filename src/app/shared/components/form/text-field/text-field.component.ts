import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormInput } from '@shared/utils/abstract-form-input';

@Component({
	selector: 'app-text-field',
	templateUrl: './text-field.component.html',
	styleUrls: ['./text-field.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextFieldComponent),
			multi: true,
		},
	],
})
export class TextFieldComponent
	extends AbstractFormInput<string>
	implements OnInit
{
	@Input() type!: 'text' | 'password';
	@Input() endIcon!: string;

	override ngOnInit(): void {
		super.ngOnInit();
		this.class = this.endIcon ? 'p-input-icon-right' : '';
	}

	override onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		this.onChanged(this.value);
	}
}
