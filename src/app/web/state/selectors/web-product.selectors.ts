import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWebState, webFeatureKey } from '../reducers/web.reducer';

export const SELECT_WEB_FEATURE =
	createFeatureSelector<IWebState>(webFeatureKey);

export const getWebProductsLoadingSelector = createSelector(
	SELECT_WEB_FEATURE,
	(state: IWebState) => state.products.loading,
);

export const getWebProductsSelector = createSelector(
	SELECT_WEB_FEATURE,
	(state: IWebState) => state.products.data,
);

export const getWebCurrentProductSelector = createSelector(
	SELECT_WEB_FEATURE,
	(state: IWebState) => state.products.current,
);
