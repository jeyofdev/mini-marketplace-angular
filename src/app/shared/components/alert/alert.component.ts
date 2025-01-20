import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
	@Input({ required: true }) severity!: 'info' | 'success' | 'warn' | 'error';
	@Input({ required: true }) message!: string | null;
	@Input() icon!: string;

	ngOnInit() {
		if (this.severity === 'error' && !this.icon) {
			this.icon = 'fa-solid fa-circle-xmark';
		}
	}
}
