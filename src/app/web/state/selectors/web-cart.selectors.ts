import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWebState, webFeatureKey } from '../reducers/web.reducer';

export const SELECT_WEB_FEATURE =
	createFeatureSelector<IWebState>(webFeatureKey);

export const getWebProductsCartLoadingSelector = createSelector(
	SELECT_WEB_FEATURE,
	(state: IWebState) => state.cart.loading,
);

export const getWebProductsCartSelector = createSelector(
	SELECT_WEB_FEATURE,
	(state: IWebState) => state.cart.products,
);
