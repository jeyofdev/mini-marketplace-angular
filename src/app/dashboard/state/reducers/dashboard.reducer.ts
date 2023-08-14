import { MetaReducer, createReducer, on } from '@ngrx/store';
import { ICategory } from 'src/app/shared/model/category.model';
import { CategoryActions } from '../actions/dashboard.actions';
import { isDevMode } from '@angular/core';
import { log } from './dashboard.meta-reducer';

export const dashboardFeatureKey = 'dashboard';

export interface IDashboardState {
	categories: ICategory[];
	loading: boolean;
}

export interface State {
	readonly [dashboardFeatureKey]: IDashboardState;
}

export const initialState: IDashboardState = {
	categories: [],
	loading: false,
};

export const reducer = createReducer(
	initialState,
	on(CategoryActions.loadCategories, state => {
		return {
			...state,
			loading: true,
		};
	}),
	on(CategoryActions.loadCategoriesSuccess, (state, actions) => {
		return {
			...state,
			categories: actions.payload.data,
			loading: false,
		};
	}),
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
