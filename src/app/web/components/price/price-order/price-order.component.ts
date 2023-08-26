import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-price-order',
	templateUrl: './price-order.component.html',
	styleUrls: ['./price-order.component.scss'],
})
export class PriceOrderComponent {
	@Input() price!: number;
	@Input() title!: string;
}
