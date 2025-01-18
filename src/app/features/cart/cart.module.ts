import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from '@cart/cart-routing.module';
import { CartDeliveryAdressComponent } from '@cart/pages/cart-delivery-adress/cart-delivery-adress.component';
import { CartSummaryComponent } from '@cart/pages/cart-summary/cart-summary.component';
import { SharedModule } from '@shared/shared.module';
import { PriceOrderComponent } from '@cart/components/price/price-order/price-order.component';
import { CoreModule } from '@core/core.module';
import { OrderSummaryComponent } from '@cart/components/order-summary/order-summary.component';
import { ProductsListComponent } from '@cart/components/products-list/products-list.component';
import { DeliveryInformationComponent } from '@cart/components/delivery-information/delivery-information.component';
import { ConfirmDeliveryComponent } from '@cart/components/confirm/confirm-delivery/confirm-delivery.component';

@NgModule({
	declarations: [
		CartDeliveryAdressComponent,
		CartSummaryComponent,
		ProductsListComponent,
		PriceOrderComponent,
		OrderSummaryComponent,
		DeliveryInformationComponent,
		ConfirmDeliveryComponent,
	],
	imports: [CommonModule, CartRoutingModule, SharedModule, CoreModule],
})
export class CartModule {}
