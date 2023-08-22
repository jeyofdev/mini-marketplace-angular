import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-base-chip',
	templateUrl: './base-chip.component.html',
	styleUrls: ['./base-chip.component.scss'],
})
export class BaseChipComponent implements OnInit {
	@Input() label!: string;
	@Input() removable!: boolean;
	@Input() size!: 'normal' | 'small' | 'large';
	@Input() color!: 'primary' | 'success' | 'info' | 'warning' | 'danger';
	@Input() outlined!: boolean;

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

		if (this.outlined) {
			this.styleClass += ` p-chip-outlined`;
		}
	}
}
