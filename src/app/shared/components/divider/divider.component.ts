import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-divider',
	templateUrl: './divider.component.html',
	styleUrls: ['./divider.component.scss'],
})
export class DividerComponent {
	@Input() layout: 'vertical' | 'horizontal' = 'horizontal';
	@Input() maxWidth!: number;
	@Input() icon!: IconDefinition;
	@Input() label!: string;
	@Input() backgroundColor!: string;
}
