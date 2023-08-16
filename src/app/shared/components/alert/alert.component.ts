import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
	@Input() severity!: 'info' | 'success' | 'warn' | 'error';
	@Input() message!: string | null;
	@Input() icon!: string;

	ngOnInit() {
		if (this.severity === 'error' && !this.icon) {
			this.icon = 'fa-solid fa-circle-xmark';
		}
	}
}
