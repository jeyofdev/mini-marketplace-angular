import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-button-empty',
	templateUrl: './button-empty.component.html',
	styleUrls: ['./button-empty.component.scss'],
})
export class ButtonEmptyComponent implements OnInit {
	@Input() label!: string;
	@Input() icon!: string;
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
		this.styleClass = '';

		if (this.color) {
			this.styleClass += `p-button-${this.color}`;
		}
	}
}
