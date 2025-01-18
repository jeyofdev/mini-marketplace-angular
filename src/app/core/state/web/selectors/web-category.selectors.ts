import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWebState, webFeatureKey } from '@core/state/web/reducers/web.reducer';

export const SELECT_WEB_FEATURE =
	createFeatureSelector<IWebState>(webFeatureKey);

export const getWebCategoriesLoadingSelector = createSelector(
	SELECT_WEB_FEATURE,
	(state: IWebState) => state.categories.loading,
);

export const getWebCategoriesSelector = createSelector(
	SELECT_WEB_FEATURE,
	(state: IWebState) => state.categories.data,
);
