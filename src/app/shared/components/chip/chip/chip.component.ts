import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-chip',
	templateUrl: './chip.component.html',
	styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit {
	@Input() label!: string | number;
	@Input() size!: 'small' | 'large';
	@Input() severity!: 'primary' | 'success' | 'info' | 'warning' | 'danger';

	class!: string;
	ngOnInit(): void {
		this.class = 'chip ';

		if (this.size) {
			this.class += `chip-${this.size} `;
		}

		if (this.severity) {
			this.class += `chip-${this.severity} `;
		}
	}
}
