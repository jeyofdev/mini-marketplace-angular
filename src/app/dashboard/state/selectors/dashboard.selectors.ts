import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	IDashboardState,
	dashboardFeatureKey,
} from '../reducers/dashboard.reducer';

export const SELECT_DASHBOARD_FEATURE =
	createFeatureSelector<IDashboardState>(dashboardFeatureKey);

export const getDashboardSelector = createSelector(
	SELECT_DASHBOARD_FEATURE,
	(state: IDashboardState) => state.categories,
);
