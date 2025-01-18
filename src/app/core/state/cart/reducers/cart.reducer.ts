import { MetaReducer, combineReducers } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { log } from '@core/state/cart/reducers/cart.meta-reducer';
import {
	CartProductFeatureKey,
	ICartProductState,
	initialCartProductState,
	productReducer,
} from '@core/state/cart/reducers/cart-product.reducer';
import {
	CartDeliveryFeatureKey,
	ICartDeliveryState,
	deliveryReducer,
	initialCartDeliveryState,
} from '@core/state/cart/reducers/cart-delivery.reducer';

export const cartFeatureKey = 'cart';

export interface ICartState {
	[CartProductFeatureKey]: ICartProductState;
	[CartDeliveryFeatureKey]: ICartDeliveryState;
}

export const initialCartState: ICartState = {
	[CartProductFeatureKey]: initialCartProductState,
	[CartDeliveryFeatureKey]: initialCartDeliveryState,
};

export const reducers = combineReducers(
	{
		[CartProductFeatureKey]: productReducer,
		[CartDeliveryFeatureKey]: deliveryReducer,
	},
	initialCartState,
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
