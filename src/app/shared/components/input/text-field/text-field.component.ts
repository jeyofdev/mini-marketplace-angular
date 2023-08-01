import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-text-field',
	templateUrl: './text-field.component.html',
	styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements OnInit {
	@Input() type!: 'text' | 'password';
	@Input() appearance!: 'outline' | 'fill';
	@Input() name!: string;
	@Input() label!: string;
	@Input() hidePassword!: boolean;
	@Input() endIcon!: boolean;

	finalType!: 'text' | 'password';

	ngOnInit(): void {
		this.finalType =
			this.type === 'text' || !this.hidePassword ? 'text' : 'password';
	}

	clickEndIcon(): void {
		this.hidePassword = !this.hidePassword;
	}
}
