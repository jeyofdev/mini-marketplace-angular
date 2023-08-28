import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartDeliveryAdressComponent } from './pages/cart-delivery-adress/cart-delivery-adress.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { SharedModule } from '../shared/shared.module';
import { TableCartProductsComponent } from './components/table-cart-products/table-cart-products.component';
import { PriceOrderComponent } from './components/price/price-order/price-order.component';
import { CoreModule } from '../core/core.module';

@NgModule({
	declarations: [
		CartDeliveryAdressComponent,
		CartSummaryComponent,
		TableCartProductsComponent,
		PriceOrderComponent,
	],
	imports: [CommonModule, CartRoutingModule, SharedModule, CoreModule],
})
export class CartModule {}
