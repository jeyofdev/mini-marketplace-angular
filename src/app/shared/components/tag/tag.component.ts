import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-tag',
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
	@Input({ required: true }) value!: string;
	@Input() variant!: 'raised';
	@Input() rounded!: boolean;
	@Input() severity!: 'primary' | 'success' | 'info' | 'warning' | 'danger';

	class!: string;

	ngOnInit(): void {
		this.class = 'tag ';

		if (this.variant) {
			this.class += `tag-${this.variant} `;
		}

		if (this.severity) {
			this.class += `tag-${this.severity} `;
		}
	}
}
