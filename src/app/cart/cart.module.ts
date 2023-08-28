import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartDeliveryAdressComponent } from './pages/cart-delivery-adress/cart-delivery-adress.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { SharedModule } from '../shared/shared.module';
import { PriceOrderComponent } from './components/price/price-order/price-order.component';
import { CoreModule } from '../core/core.module';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

@NgModule({
	declarations: [
		CartDeliveryAdressComponent,
		CartSummaryComponent,
		ProductsListComponent,
		PriceOrderComponent,
		OrderSummaryComponent,
	],
	imports: [CommonModule, CartRoutingModule, SharedModule, CoreModule],
})
export class CartModule {}
