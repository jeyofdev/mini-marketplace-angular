import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	IDashboardState,
	dashboardFeatureKey,
} from '../reducers/dashboard.reducer';

export const SELECT_DASHBOARD_FEATURE =
	createFeatureSelector<IDashboardState>(dashboardFeatureKey);

export const getDashboardCategoriesLoadingSelector = createSelector(
	SELECT_DASHBOARD_FEATURE,
	(state: IDashboardState) => state.categories.loading,
);

export const getDashboardCategoriesSelector = createSelector(
	SELECT_DASHBOARD_FEATURE,
	(state: IDashboardState) => state.categories.data,
);
