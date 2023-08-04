import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-icon-button',
	templateUrl: './icon-button.component.html',
	styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
	@Input() icon!: IconDefinition;
}
