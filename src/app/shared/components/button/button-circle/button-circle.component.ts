import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-button-circle',
	templateUrl: './button-circle.component.html',
	styleUrls: ['./button-circle.component.scss'],
})
export class ButtonCircleComponent implements OnInit {
	@Input() label!: string;
	@Input() icon!: string;
	@Input() showLabel!: boolean;
	@Input() selected!: boolean;
	@Input() size!: 'normal' | 'small' | 'large';
	@Input() color!:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'info'
		| 'help';
	styleClass!: string;
	circleClass!: string;

	ngOnInit(): void {
		this.setStyleClass();
		this.setCircleClass();
	}

	onClick(): void {
		if (this.selected) {
			this.selected = !this.selected;
			this.setCircleClass();
		}
	}

	private setStyleClass(): void {
		this.styleClass = 'p-button-rounded';

		if (this.color) {
			this.styleClass += ` p-button-${this.color}`;
		} else {
			this.styleClass += ' p-button-transparent';
		}
	}

	private setCircleClass(): void {
		this.circleClass = 'circle';

		if (this.selected && this.color) {
			this.circleClass += ` circle-${this.color}`;
		}
	}
}
