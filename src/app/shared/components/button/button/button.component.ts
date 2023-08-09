import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
	@Input() variant!: 'rounded' | 'raised' | 'icon';
	@Input() icon!: IconDefinition;
	@Input() color!:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'info'
		| 'help';
	styleClass!: string;

	ngOnInit(): void {
		this.styleClass =
			this.variant === 'icon'
				? `p-button-rounded p-button-${this.color} p-button-text rounded-icon`
				: `p-button-${this.variant} p-button-${this.color}`;
	}
}