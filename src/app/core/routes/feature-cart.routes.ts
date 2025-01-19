import { Routes } from '@angular/router';
import { CartDeliveryAdressComponent } from '@cart/pages/cart-delivery-adress/cart-delivery-adress.component';
import { CartSummaryComponent } from '@cart/pages/cart-summary/cart-summary.component';

export const routes: Routes = [
	{
		path: 'summary',
		component: CartSummaryComponent,
	},
	{
		path: 'delivery-address',
		component: CartDeliveryAdressComponent,
	},
];
