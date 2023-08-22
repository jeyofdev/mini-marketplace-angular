import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-image-full-height',
	templateUrl: './image-full-height.component.html',
	styleUrls: ['./image-full-height.component.scss'],
})
export class ImageFullHeightComponent implements OnInit {
	@Input() src!: string;
	@Input() alt!: string;
	@Input() position!: 'top' | 'bottom' | 'center';
	@Input() hasBorderRadius!: boolean;

	class!: string;

	ngOnInit(): void {
		this.class = 'img-box';

		if (this.hasBorderRadius) {
			this.class += ' img-box-radius';
		}
	}
}
