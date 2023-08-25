import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-divider',
	templateUrl: './divider.component.html',
	styleUrls: ['./divider.component.scss'],
})
export class DividerComponent {
	@Input() layout: 'vertical' | 'horizontal' = 'horizontal';
	@Input() maxWidth!: string;
	@Input() icon!: string;
	@Input() label!: string;
	@Input() backgroundColor!: string;
	@Input() margin!: string;
}
