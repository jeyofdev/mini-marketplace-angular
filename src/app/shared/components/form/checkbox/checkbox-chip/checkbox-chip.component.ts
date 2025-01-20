import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormCheckbox } from '@shared/utils/abstract-form-checkbox';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
	selector: 'app-checkbox-chip',
	templateUrl: './checkbox-chip.component.html',
	styleUrls: ['./checkbox-chip.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxChipComponent),
			multi: true,
		},
	],
})
export class CheckboxChipComponent
	extends AbstractFormCheckbox
	implements OnInit
{
	styleClass!: string;
	labelStyleClass!: string;

	override ngOnInit(): void {
		super.ngOnInit();

		this.setStyleClass();
		this.setLabelStyleClass();
	}

	onInputChange(event: CheckboxChangeEvent) {
		this.valueChange.emit(event.checked);
		this.onChanged(event.checked);
		this.onTouched();
	}

	private setStyleClass(): void {
		this.styleClass = '';

		if (this.color) {
			this.styleClass += `p-checkbox-${this.color} `;
		}
	}

	private setLabelStyleClass(): void {
		this.labelStyleClass = '';

		if (this.color) {
			this.labelStyleClass += ` label-${this.color} `;
		}
	}
}
