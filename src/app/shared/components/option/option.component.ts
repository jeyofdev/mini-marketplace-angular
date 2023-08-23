import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
	@Input() label!: string;
	@Input() icon!: string;
}
