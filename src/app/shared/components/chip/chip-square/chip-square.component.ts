import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-chip-square',
	templateUrl: './chip-square.component.html',
	styleUrls: ['./chip-square.component.scss'],
})
export class ChipSquareComponent implements OnInit {
	@Input() label!: string;
	@Input() size!: 'normal' | 'xsmall' | 'small' | 'large' | 'xlarge';
	@Input() color!: 'primary' | 'success' | 'info' | 'warning' | 'danger';

	styleClass!: string;

	ngOnInit(): void {
		this.setStyleClass();
	}

	private setStyleClass(): void {
		this.styleClass = 'p-chip';

		if (this.color) {
			this.styleClass += ` p-chip-${this.color}`;
		}

		if (this.size) {
			this.styleClass += ` p-chip-${this.size}`;
		}
	}
}
