import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-ship',
	templateUrl: './ship.component.html',
	styleUrls: ['./ship.component.scss'],
})
export class ShipComponent implements OnInit {
	@Input() label!: string;
	@Input() size!: 'small';
	@Input() severity!: 'primary' | 'success' | 'info' | 'warning' | 'danger';

	class!: string;
	ngOnInit(): void {
		this.class = 'chip ';

		if (this.size === 'small') {
			this.class += `chip-${this.size} `;
		}

		if (this.severity) {
			this.class += `chip-${this.severity} `;
		}
	}
}
