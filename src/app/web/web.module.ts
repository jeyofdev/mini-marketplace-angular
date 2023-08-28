import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { ChildrenComponent } from './pages/children/children.component';
import { ProductListComponent } from './components/list/product-list/product-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeb from './state/reducers/web.reducer';
import { WebCategoryEffects } from './state/effects/web-category.effects';
import { WebProductEffects } from './state/effects/web-product.effects';
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
	imports: [
		CommonModule,
		WebRoutingModule,
		SharedModule,
		CoreModule,
		StoreModule.forFeature(fromWeb.webFeatureKey, fromWeb.reducers, {
			metaReducers: fromWeb.metaReducers,
		}),
		EffectsModule.forFeature([WebCategoryEffects, WebProductEffects]),
	],
})
export class WebModule {}
