import { MetaReducer, combineReducers } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { log } from '@dashboard/state/reducers/dashboard.meta-reducer';
import {
	IDashboardProductState,
	dashboardProductFeatureKey,
	initialProductState,
	productReducer,
} from '@dashboard/state/reducers/dashboard-product.reducer';
import {
	IDashboardCategoryState,
	categoryReducer,
	dashboardCategoryFeatureKey,
	initialCategoryState,
} from '@dashboard/state/reducers/dashboard-category.reducer';

export const dashboardFeatureKey = 'dashboard';

export interface IDashboardState {
	[dashboardCategoryFeatureKey]: IDashboardCategoryState;
	[dashboardProductFeatureKey]: IDashboardProductState;
}

export const initialDashboardState: IDashboardState = {
	[dashboardCategoryFeatureKey]: initialCategoryState,
	[dashboardProductFeatureKey]: initialProductState,
};

export const reducers = combineReducers(
	{
		[dashboardCategoryFeatureKey]: categoryReducer,
		[dashboardProductFeatureKey]: productReducer,
	},
	initialDashboardState,
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
