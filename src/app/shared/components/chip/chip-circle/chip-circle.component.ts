import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-chip-circle',
	templateUrl: './chip-circle.component.html',
	styleUrls: ['./chip-circle.component.scss'],
})
export class ChipCircleComponent implements OnInit {
	@Input() label!: string;
	@Input() icon!: string;
	@Input() size!: 'normal' | 'small' | 'large' | 'xlarge';
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
