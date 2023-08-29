import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CardProductCartComponent } from './components/cart/card-product-cart/card-product-cart.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { HeaderUserActionComponent } from './components/header-user-action/header-user-action.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavigationLinkMobileComponent } from './components/link/navigation-link-mobile/navigation-link-mobile.component';
import { NavMobileComponent } from './components/nav/nav-mobile/nav-mobile.component';
import { NavigationComponent } from './components/nav/navigation/navigation.component';
import { StoreModule } from '@ngrx/store';
import * as fromWeb from '../core/state/reducers/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from '../core/state/effects/cart-product.effects';
import { NavigationLinkComponent } from './components/link/navigation-link/navigation-link.component';
import { CartDeliveryEffects } from './state/effects/cart-delivery.effects';

@NgModule({
	declarations: [
		LayoutComponent,
		NavigationComponent,
		NavMobileComponent,
		HeaderUserActionComponent,
		CartComponent,
		CardProductCartComponent,
		NavigationLinkMobileComponent,
		NavigationLinkComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		StoreModule.forFeature(fromWeb.cartFeatureKey, fromWeb.reducers, {
			metaReducers: fromWeb.metaReducers,
		}),
		EffectsModule.forFeature([CartEffects, CartDeliveryEffects]),
	],
	exports: [LayoutComponent],
})
export class CoreModule {}
