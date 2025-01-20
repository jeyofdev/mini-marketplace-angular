import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormCheckbox } from '@shared/utils/abstract-form-checkbox';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
	selector: 'app-checkbox-color',
	templateUrl: './checkbox-color.component.html',
	styleUrls: ['./checkbox-color.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxColorComponent),
			multi: true,
		},
	],
})
export class CheckboxColorComponent
	extends AbstractFormCheckbox
	implements OnInit
{
	@Input() showLabel!: boolean;

	styleClass!: string;

	override ngOnInit(): void {
		super.ngOnInit();
		this.setBorderClass();
		this.setStyleClass();
	}

	override onInputChange(event: CheckboxChangeEvent) {
		this.valueChange.emit(event.checked);
		this.onChanged(event.checked);
		this.onTouched();
		this.setBorderClass();
	}

	private setStyleClass(): void {
		this.styleClass = '';

		if (this.color) {
			this.styleClass += `p-checkbox-${this.color}`;
		}
	}

	protected override setBorderClass(): void {
		this.borderClass = 'border';

		if (this.color && this.checked) {
			this.borderClass += ` checked-border-${this.color}`;
		}
	}
}
