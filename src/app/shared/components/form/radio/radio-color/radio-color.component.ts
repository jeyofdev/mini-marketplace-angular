import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { ColorItemType } from '@shared/model/input.interface';
import { AbstractFormRadio } from '@shared/utils/abstract-form-radio';

@Component({
	selector: 'app-radio-color',
	templateUrl: './radio-color.component.html',
	styleUrls: ['./radio-color.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioColorComponent),
			multi: true,
		},
	],
})
export class RadioColorComponent
	extends AbstractFormRadio<ColorItemType>
	implements OnInit
{
	styleClass!: string;

	override ngOnInit(): void {
		super.ngOnInit();
		this.setStyleClass();
	}

	override onInputChange(event: RadioButtonClickEvent) {
		this.onChanged(event.value);
		this.onTouched();
	}

	private setStyleClass(): void {
		this.styleClass = '';

		if (this.color) {
			this.styleClass += `p-radiobutton-${this.color} `;
		}
	}
}
