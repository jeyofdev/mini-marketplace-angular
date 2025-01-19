import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { ChoiceItemType } from '@shared/interfaces/input.interface';
import { AbstractFormInput } from '@shared/utils/abstract-form-input';

@Component({
	selector: 'app-select-multiple',
	templateUrl: './select-multiple.component.html',
	styleUrls: ['./select-multiple.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectMultipleComponent),
			multi: true,
		},
	],
})
export class SelectMultipleComponent extends AbstractFormInput<ChoiceItemType> {
	@Input() items!: ChoiceItemType[];

	selectedItem: ChoiceItemType | undefined;

	onInputChange(event: MultiSelectChangeEvent) {
		if (event.value) {
			this.onChanged(event.value);
		}

		this.onTouched();
	}
}
