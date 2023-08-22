import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-button-rounded',
	templateUrl: './button-rounded.component.html',
	styleUrls: ['./button-rounded.component.scss'],
})
export class ButtonRoundedComponent implements OnInit {
	@Input() label!: string;
	@Input() outlined!: boolean;
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

	onClick(): void {
		this.outlined = !this.outlined;
		this.setStyleClass();
	}

	private setStyleClass(): void {
		this.styleClass = '';

		if (this.color) {
			this.styleClass += `circle-${this.color} p-button-${this.color}`;
		}

		if (this.outlined) {
			this.styleClass += ' p-button-outlined';
		}
	}
}
