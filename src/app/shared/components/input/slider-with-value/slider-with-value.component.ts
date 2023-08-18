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
import { getFormControl } from '../../../utils/form.utils';
import { SliderChangeEvent } from 'primeng/slider';

@Component({
	selector: 'app-slider-with-value',
	templateUrl: './slider-with-value.component.html',
	styleUrls: ['./slider-with-value.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SliderWithValueComponent),
			multi: true,
		},
	],
})
export class SliderWithValueComponent implements OnInit, ControlValueAccessor {
	@Input() name!: string;
	@Input() label!: string;
	@Input() min!: number;
	@Input() max!: number;
	@Input() step!: number;

	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

	value!: number;
	disabled!: boolean;

	onChanged!: (value: number) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.value = 1;
	}

	selectionChanged(event: SliderChangeEvent) {
		if (event.value) {
			this.valueChange.emit(event.value);
			this.onChanged(event.value);
			this.onTouched();
		}
	}

	writeValue(value: number): void {
		this.value = value;
	}

	registerOnChange(fn: (value: number) => void): void {
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

	get control() {
		return getFormControl(this.groupName, this.parentForm, this.name);
	}
}
