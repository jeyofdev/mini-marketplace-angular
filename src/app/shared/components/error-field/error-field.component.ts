import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IValidationMessage } from '../../interfaces/validation-message.interface';

@Component({
	selector: 'app-error-field',
	templateUrl: './error-field.component.html',
	styleUrls: ['./error-field.component.scss'],
})
export class ErrorFieldComponent {
	@Input() formControl!: FormControl;
	@Input() validationMessages!: IValidationMessage;
}
