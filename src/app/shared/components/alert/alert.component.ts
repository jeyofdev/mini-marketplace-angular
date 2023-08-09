import { Component, Input, OnInit } from '@angular/core';
import {
	IconDefinition,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
	@Input() severity!: 'info' | 'success' | 'warn' | 'error';
	@Input() message!: string | null;
	@Input() icon!: IconDefinition;

	ngOnInit() {
		if (this.severity === 'error') {
			this.icon = faCircleXmark;
		}
	}
}
