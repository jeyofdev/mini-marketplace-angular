import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { ChoiceItemType } from '@shared/interfaces/input.interface';
import { AbstractFormInput } from '@shared/utils/abstract-form-input';

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
export class SelectComponent
	extends AbstractFormInput<ChoiceItemType>
	implements OnInit
{
	@Input() items!: ChoiceItemType[];

	selectedItem: ChoiceItemType | undefined;
	showClear!: boolean;

	override ngOnInit(): void {
		super.ngOnInit();
		this.showClear = false;
	}

	onInputChange(event: DropdownChangeEvent) {
		if (event.value) {
			this.showClear = true;
			this.onChanged(event.value);
		} else {
			this.showClear = false;
		}

		this.onTouched();
	}
}
