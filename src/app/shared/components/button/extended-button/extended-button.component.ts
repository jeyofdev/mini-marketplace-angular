import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-extended-button',
	templateUrl: './extended-button.component.html',
	styleUrls: ['./extended-button.component.scss'],
})
export class ExtendedButtonComponent {
	@Input() icon!: IconDefinition;
}
