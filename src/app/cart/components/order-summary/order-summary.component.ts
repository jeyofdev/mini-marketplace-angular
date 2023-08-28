import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-order-summary',
	templateUrl: './order-summary.component.html',
	styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
	@Input() loading!: boolean;
	@Input() totalProducts!: number;
	@Input() totalCart!: number;
	@Input() totalDelivery!: number;
	@Input() totalPriceProducts!: number;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
	) {}

	onRedirect(): void {
		if (this.activatedRoute.snapshot.url[0].path === 'summary') {
			this.router.navigateByUrl('/cart/delivery-address');
		}
	}
}
