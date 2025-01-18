import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	IDashboardState,
	dashboardFeatureKey,
} from '@dashboard/state/reducers/dashboard.reducer';

export const SELECT_DASHBOARD_FEATURE =
	createFeatureSelector<IDashboardState>(dashboardFeatureKey);

export const getDashboardProductsLoadingSelector = createSelector(
	SELECT_DASHBOARD_FEATURE,
	(state: IDashboardState) => state.products.loading,
);

export const getDashboardProductsSelector = createSelector(
	SELECT_DASHBOARD_FEATURE,
	(state: IDashboardState) => state.products.data,
);
