import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-badge-color',
	templateUrl: './badge-color.component.html',
	styleUrls: ['./badge-color.component.scss'],
})
export class BadgeColorComponent implements OnInit {
	@Input() size!: 'small' | 'medium' | 'large' | 'xlarge';
	@Input() color!: 'red' | 'green' | 'blue' | 'yellow' | 'purple';

	class!: string;

	ngOnInit(): void {
		this.class = 'badge ';

		if (this.size) {
			this.class += `badge-${this.size} `;
		}

		if (this.color) {
			this.class += `bg-${this.color} `;
		}
	}
}
