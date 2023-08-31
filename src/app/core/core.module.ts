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
import * as fromCart from '../core/state/cart/reducers/cart.reducer';
import * as fromUser from '../core/state/user/reducers/user.reducer';
import * as fromWeb from '../core/state/web/reducers/web.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from '../core/state/cart/effects/cart-product.effects';
import { NavigationLinkComponent } from './components/link/navigation-link/navigation-link.component';
import { CartDeliveryEffects } from './state/cart/effects/cart-delivery.effects';
import { UserListEffects } from './state/user/effects/user-list.effects';
import { WebCategoryEffects } from './state/web/effects/web-category.effects';
import { WebProductEffects } from './state/web/effects/web-product.effects';
import { UserInitEffects } from './state/user/effects/user-init.effects';

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
		StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducers, {
			metaReducers: fromCart.metaReducers,
		}),
		StoreModule.forFeature(fromWeb.webFeatureKey, fromWeb.reducers, {
			metaReducers: fromWeb.metaReducers,
		}),
		StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducers, {
			metaReducers: fromUser.metaReducers,
		}),
		EffectsModule.forFeature([
			CartEffects,
			CartDeliveryEffects,
			UserInitEffects,
			UserListEffects,
			WebCategoryEffects,
			WebProductEffects,
		]),
	],
	exports: [LayoutComponent],
})
export class CoreModule {}
