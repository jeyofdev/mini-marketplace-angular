import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { ChildrenComponent } from './pages/children/children.component';
import { ProductListComponent } from './components/list/product-list/product-list.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductComponent } from './pages/product/product.component';
import { CardProductListComponent } from './components/card/card-list-product/card-product-list.component';
import { CoreModule } from '../core/core.module';

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
	],
	imports: [CommonModule, WebRoutingModule, SharedModule, CoreModule],
})
export class WebModule {}
