import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormInput } from '@shared/utils/abstract-form-input';
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
export class SliderWithValueComponent
	extends AbstractFormInput<number>
	implements OnInit
{
	@Input() min!: number;
	@Input() max!: number;
	@Input() step!: number;

	@Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

	override ngOnInit(): void {
		super.ngOnInit();
		this.value = 1;
	}

	override onInputChange(event: SliderChangeEvent) {
		if (event.value) {
			this.valueChange.emit(event.value);
			this.onChanged(event.value);
			this.onTouched();
		}
	}
}
