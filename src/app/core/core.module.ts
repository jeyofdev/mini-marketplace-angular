import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CardProductCartComponent } from '@core/components/cart/card-product-cart/card-product-cart.component';
import { CartComponent } from '@core/components/cart/cart/cart.component';
import { HeaderUserActionComponent } from '@core/components/header-user-action/header-user-action.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { StoreModule } from '@ngrx/store';
import * as fromCart from '@core/state/cart/reducers/cart.reducer';
import * as fromUser from '@core/state/user/reducers/user.reducer';
import * as fromWeb from '@core/state/web/reducers/web.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from '@core/state/cart/effects/cart-product.effects';
import { CartDeliveryEffects } from '@core/state/cart/effects/cart-delivery.effects';
import { UserListEffects } from '@core/state/user/effects/user-list.effects';
import { WebCategoryEffects } from '@core/state/web/effects/web-category.effects';
import { WebProductEffects } from '@core/state/web/effects/web-product.effects';
import { UserInformationsEffects } from '@core/state/user/effects/user-informations.effects';
import { NavigationLinkMobileComponent } from '@core/components/nav/link/navigation-link-mobile/navigation-link-mobile.component';
import { NavigationLinkComponent } from '@core/components/nav/link/navigation-link/navigation-link.component';
import { NavMobileComponent } from '@core/components/nav/nav-mobile/nav-mobile.component';
import { NavigationComponent } from '@core/components/nav/navigation/navigation.component';

@NgModule({
	declarations: [
		LayoutComponent,
		HeaderUserActionComponent,
		CartComponent,
		CardProductCartComponent,
		NavigationLinkMobileComponent,
		NavigationLinkComponent,
		NavMobileComponent,
		NavigationComponent,
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
			UserInformationsEffects,
			UserListEffects,
			WebCategoryEffects,
			WebProductEffects,
		]),
	],
	exports: [LayoutComponent],
})
export class CoreModule {}
