import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-square-button',
	templateUrl: './square-button.component.html',
	styleUrls: ['./square-button.component.scss'],
})
export class SquareButtonComponent {
	@Input() label!: string;
	@Input() color!: ThemePalette;
	@Input() icon!: IconDefinition;
	@Input() size!: string;
	@Input() outline!: boolean;

	getWidth(): string {
		return this.size;
	}
}
