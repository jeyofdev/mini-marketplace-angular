import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-logo',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
	@Input() hasPaddingLeft!: boolean;
	classBox!: string;

	ngOnInit(): void {
		this.classBox = 'logo-box';

		if (this.hasPaddingLeft) {
			this.classBox += ' pl';
		}
	}
}
