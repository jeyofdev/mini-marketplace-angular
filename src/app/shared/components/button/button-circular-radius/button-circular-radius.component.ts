import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-button-circular-radius',
	templateUrl: './button-circular-radius.component.html',
	styleUrls: ['./button-circular-radius.component.scss'],
})
export class ButtonCircularRadiusComponent implements OnInit {
	@Input() label!: string;
	@Input() type!: 'button' | 'submit' | 'reset';
	@Input() icon!: string;
	@Input() outlined!: boolean;
	@Input() size!: 'normal' | 'small' | 'large' | 'full';
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
		this.setStyleClass();
	}

	private setStyleClass(): void {
		this.styleClass = 'p-button-rounded';

		if (this.color) {
			this.styleClass += ` p-button-${this.color}`;
		}

		if (this.size) {
			this.styleClass += ` p-button-${this.size}`;
		}

		if (this.outlined) {
			this.styleClass += ' p-button-outlined';
		}
	}
}
