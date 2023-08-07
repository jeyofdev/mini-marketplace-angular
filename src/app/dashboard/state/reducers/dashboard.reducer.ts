import { MetaReducer, createReducer, on } from '@ngrx/store';
import { ICategory } from 'src/app/shared/model/category.model';
import { CategoryActions } from '../actions/dashboard.actions';
import { isDevMode } from '@angular/core';
import { log } from './dashboard.meta-reducer';

export const dashboardFeatureKey = 'dashboard';

export interface IDashboardState {
	categories: ICategory[];
}

export interface State {
	readonly [dashboardFeatureKey]: IDashboardState;
}

export const initialState: IDashboardState = {
	categories: [],
};

export const reducer = createReducer(
	initialState,
	on(CategoryActions.loadCategoriesSuccess, (state, actions) => {
		return {
			...state,
			categories: actions.payload.data,
		};
	}),
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
