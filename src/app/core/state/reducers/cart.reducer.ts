import { MetaReducer, combineReducers } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { log } from './cart.meta-reducer';
import {
	CartProductFeatureKey,
	ICartProductState,
	initialCartProductState,
	productReducer,
} from './cart-product.reducer';

export const cartFeatureKey = 'cart';

export interface ICartState {
	[CartProductFeatureKey]: ICartProductState;
}

export const initialCartState: ICartState = {
	[CartProductFeatureKey]: initialCartProductState,
};

export const reducers = combineReducers(
	{
		[CartProductFeatureKey]: productReducer,
	},
	initialCartState,
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
