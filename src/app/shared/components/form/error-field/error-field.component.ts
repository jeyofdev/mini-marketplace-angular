import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IValidationMessage } from '../../../interfaces/validation-message.interface';

@Component({
	selector: 'app-error-field',
	templateUrl: './error-field.component.html',
	styleUrls: ['./error-field.component.scss'],
})
export class ErrorFieldComponent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() control!: AbstractControl<any, any> | null;
	@Input() validationMessages!: IValidationMessage;
}
