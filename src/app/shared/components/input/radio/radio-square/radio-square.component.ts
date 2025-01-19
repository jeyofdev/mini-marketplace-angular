import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { ChoiceItemType } from '@shared/interfaces/input.interface';
import { AbstractFormRadio } from '@shared/utils/abstract-form-radio';

@Component({
	selector: 'app-radio-square',
	templateUrl: './radio-square.component.html',
	styleUrls: ['./radio-square.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioSquareComponent),
			multi: true,
		},
	],
})
export class RadioSquareComponent
	extends AbstractFormRadio<ChoiceItemType>
	implements OnInit
{
	styleClass!: string;

	override ngOnInit(): void {
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

		if (this.value === this.item.value) {
			this.styleClass += `p-radiobutton-bg-${this.color}`;
		}
	}
}
