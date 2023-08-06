/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	forwardRef,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ISelectItem } from '../../../interfaces/input.interface';
import { getFormControl } from '../../../utils/form.utils';

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
export class SelectComponent implements OnInit, ControlValueAccessor {
	@ViewChild(MatSelect) matSelect!: MatSelect;
	@Input() appearance!: 'outline' | 'fill';
	@Input() label!: string;
	@Input() name!: string;
	@Input() items!: ISelectItem[];
	@Input() parentForm!: FormGroup;
	@Input() groupName!: string;

	@Output() selectionChange: EventEmitter<MatSelectChange> =
		new EventEmitter<MatSelectChange>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

	isDisabled!: boolean;
	value!: string;

	onChange!: (value: string) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		// eslint-disable-next-line no-console
		console.log('init');
	}

	selectionChanged(event: MatSelectChange) {
		this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
	}

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	get formControl() {
		return getFormControl(this.groupName, this.parentForm, this.name);
	}
}
