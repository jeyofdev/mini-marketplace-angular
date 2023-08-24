import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './components/nav/navigation/navigation.component';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { ChildrenComponent } from './pages/children/children.component';
import { NavigationLinkComponent } from './components/link/navigation-link/navigation-link.component';
import { HeaderUserActionComponent } from './components/header-user-action/header-user-action.component';
import { NavMobileComponent } from './components/nav/nav-mobile/nav-mobile.component';
import { NavigationLinkMobileComponent } from './components/link/navigation-link-mobile/navigation-link-mobile.component';
import { ProductCardListComponent } from './components/card/product-card-list/product-card-list.component';
import { ProductListComponent } from './components/list/product-list/product-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeb from './state/reducers/web.reducer';
import { WebCategoryEffects } from './state/effects/web-category.effects';
import { WebProductEffects } from './state/effects/web-product.effects';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductComponent } from './pages/product/product.component';
import { WebCartEffects } from './state/effects/web-cart.effects';

@NgModule({
	declarations: [
		HomeComponent,
		LayoutComponent,
		NavigationComponent,
		MenComponent,
		WomenComponent,
		ChildrenComponent,
		NavigationLinkComponent,
		HeaderUserActionComponent,
		NavMobileComponent,
		NavigationLinkMobileComponent,
		ProductCardListComponent,
		ProductListComponent,
		AllProductsComponent,
		ProductComponent,
	],
	imports: [
		CommonModule,
		WebRoutingModule,
		SharedModule,
		StoreModule.forFeature(fromWeb.webFeatureKey, fromWeb.reducers, {
			metaReducers: fromWeb.metaReducers,
		}),
		EffectsModule.forFeature([
			WebCategoryEffects,
			WebProductEffects,
			WebCartEffects,
		]),
	],
})
export class WebModule {}
