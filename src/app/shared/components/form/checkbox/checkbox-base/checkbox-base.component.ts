import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormCheckbox } from '@shared/utils/abstract-form-checkbox';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
	selector: 'app-checkbox-base',
	templateUrl: './checkbox-base.component.html',
	styleUrls: ['./checkbox-base.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxBaseComponent),
			multi: true,
		},
	],
})
export class CheckboxBaseComponent
	extends AbstractFormCheckbox
	implements OnInit
{
	override ngOnInit(): void {
		super.ngOnInit();
	}

	onInputChange(event: CheckboxChangeEvent) {
		this.valueChange.emit(event.checked);
		this.onChanged(event.checked);
		this.onTouched();
	}
}
