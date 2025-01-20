import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormCheckbox } from '@shared/utils/abstract-form-checkbox';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
	selector: 'app-checkbox-color-border',
	templateUrl: './checkbox-color-border.component.html',
	styleUrls: ['./checkbox-color-border.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxColorBorderComponent),
			multi: true,
		},
	],
})
export class CheckboxColorBorderComponent extends AbstractFormCheckbox {
	@Input() showLabel!: boolean;
	@Input() hasBorder!: boolean;

	override onInputChange(event: CheckboxChangeEvent) {
		this.valueChange.emit(event.checked);
		this.onChanged(event.checked);
		this.onTouched();
	}
}
