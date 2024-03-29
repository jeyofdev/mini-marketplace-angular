import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { CartDeliveryAdressComponent } from './pages/cart-delivery-adress/cart-delivery-adress.component';

const routes: Routes = [
	{
		path: 'summary',
		component: CartSummaryComponent,
	},
	{
		path: 'delivery-address',
		component: CartDeliveryAdressComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CartRoutingModule {}
