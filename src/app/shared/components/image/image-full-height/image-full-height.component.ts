import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-image-full-height',
	templateUrl: './image-full-height.component.html',
	styleUrls: ['./image-full-height.component.scss'],
})
export class ImageFullHeightComponent {
	@Input() src!: string;
	@Input() alt!: string;
	@Input() position!: 'top' | 'bottom' | 'center';
}
