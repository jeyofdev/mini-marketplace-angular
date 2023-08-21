import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
	@Input() variant!: 'rounded' | 'raised' | 'icon';
	@Input() shape!: 'circle' | 'oval' | 'square';
	@Input() type!: 'submit' | 'reset' | 'button';
	@Input() iconPrefix!: string;
	@Input() iconSuffix!: string;
	@Input() icon!: string;
	@Input() disabled!: boolean;
	@Input() outline!: boolean;
	@Input() text!: boolean;
	@Input() shadow!: boolean;
	@Input() size!: 'medium' | 'normal' | 'large';
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
		if (this.variant) {
			this.styleClass = ` p-button-${this.variant}`;
		}

		if (this.color) {
			this.styleClass += ` p-button-${this.color}`;
		} else {
			this.styleClass += ` p-button-transparent`;
		}

		if (this.outline) {
			this.styleClass += ' p-button-outlined';
		}

		if (this.text) {
			this.styleClass += ' p-button-text';
		}

		if (this.shadow) {
			this.styleClass += ' p-button-raised';
		}

		if (this.size) {
			this.styleClass += ` size-${this.size}`;
		}

		// 		this.styleClass =
		// 			this.variant === 'icon'
		// 				? `p-button-rounded p-button-${this.color} p-button-text rounded-icon`
		// 				: `p-button-${this.variant} p-button-${this.color}`;
	}
}
