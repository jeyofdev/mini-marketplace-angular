import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICartState, cartFeatureKey } from '../reducers/cart.reducer';

export const SELECT_CART_FEATURE =
	createFeatureSelector<ICartState>(cartFeatureKey);

export const getCartProductsLoadingSelector = createSelector(
	SELECT_CART_FEATURE,
	(state: ICartState) => state.products.loading,
);

export const getCartProductsSelector = createSelector(
	SELECT_CART_FEATURE,
	(state: ICartState) => state.products.data,
);
