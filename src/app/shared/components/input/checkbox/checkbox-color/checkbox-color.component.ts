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
import { getFormControl } from '../../../../utils/form.utils';
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
export class CheckboxColorComponent implements OnInit, ControlValueAccessor {
	@Input() name!: string;
	@Input() label!: string;
	@Input() showLabel!: boolean;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Input() color!:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'info'
		| 'help';

	@Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	checked!: boolean;
	disabled!: boolean;
	borderClass!: string;
	styleClass!: string;

	onChanged!: (checked: boolean) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.checked = false;
		this.setBorderClass();
		this.setStyleClass();
	}

	selectionChanged(event: CheckboxChangeEvent) {
		this.valueChange.emit(event.checked);
		this.onChanged(event.checked);
		this.onTouched();
		this.setBorderClass();
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

	private setStyleClass(): void {
		this.styleClass = '';

		if (this.color) {
			this.styleClass += `p-checkbox-${this.color}`;
		}
	}

	private setBorderClass(): void {
		this.borderClass = 'border';

		if (this.color && this.checked) {
			this.borderClass += ` checked-border-${this.color}`;
		}
	}
}
