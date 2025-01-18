import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from '@web/web-routing.module';
import { HomeComponent } from '@web/pages/home/home.component';
import { SharedModule } from '@shared/shared.module';
import { MenComponent } from '@web/pages/men/men.component';
import { WomenComponent } from '@web/pages/women/women.component';
import { ChildrenComponent } from '@web/pages/children/children.component';
import { ProductListComponent } from '@web/components/list/product-list/product-list.component';
import { AllProductsComponent } from '@web/pages/all-products/all-products.component';
import { ProductComponent } from '@web/pages/product/product.component';
import { CardProductListComponent } from '@web/components/card/card-list-product/card-product-list.component';
import { CoreModule } from '@core/core.module';
import { WishListComponent } from '@web/pages/wish-list/wish-list.component';

@NgModule({
	declarations: [
		HomeComponent,
		MenComponent,
		WomenComponent,
		ChildrenComponent,
		CardProductListComponent,
		ProductListComponent,
		AllProductsComponent,
		ProductComponent,
		WishListComponent,
	],
	imports: [CommonModule, WebRoutingModule, SharedModule, CoreModule],
})
export class WebModule {}
