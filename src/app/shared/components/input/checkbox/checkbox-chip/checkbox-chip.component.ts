import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	forwardRef,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { getFormControl } from '@shared/utils/form.utils';
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
export class CheckboxChipComponent implements OnInit, ControlValueAccessor {
	@Input() name!: string;
	@Input() label!: string;

	@Input() color!:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'info'
		| 'help';

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	checked!: boolean;
	disabled!: boolean;

	styleClass!: string;
	borderClass!: string;
	labelStyleClass!: string;

	onChanged!: (checked: boolean) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.checked = false;

		this.setBorderClass();
		this.setStyleClass();
		this.setLabelStyleClass();
	}

	selectionChanged(event: CheckboxChangeEvent) {
		this.valueChange.emit(event.checked);
		this.onChanged(event.checked);
		this.onTouched();
	}

	writeValue(checked: boolean): void {
		this.checked = checked;
	}

	registerOnChange(fn: (checked: boolean) => void): void {
		this.onChanged = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	markAsTouched(): void {
		this.onTouched();
	}

	get formControl() {
		return getFormControl(this.groupName, this.parentForm, this.name);
	}

	private setBorderClass(): void {
		this.borderClass = 'border';

		if (this.color) {
			this.borderClass += ` border-${this.color}`;
		}
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
