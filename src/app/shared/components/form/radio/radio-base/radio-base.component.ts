import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { ChoiceItemType, ColorItemType } from '@shared/model/input.interface';
import { AbstractFormRadio } from '@shared/utils/abstract-form-radio';

@Component({
	selector: 'app-radio-base',
	templateUrl: './radio-base.component.html',
	styleUrls: ['./radio-base.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioBaseComponent),
			multi: true,
		},
	],
})
export class RadioBaseComponent extends AbstractFormRadio<
	ChoiceItemType | ColorItemType
> {
	override onInputChange(event: RadioButtonClickEvent) {
		this.onChanged(event.value);
		this.onTouched();
	}
}
