import { MetaReducer, createReducer, on } from '@ngrx/store';
import { ICategory } from '../../../shared/model/category.model';
import { CategoryActions, ProductActions } from '../actions/dashboard.actions';
import { isDevMode } from '@angular/core';
import { log } from './dashboard.meta-reducer';
import { IProduct } from '../../../shared/model/product.model';

export const dashboardFeatureKey = 'dashboard';

export interface IDashboardState {
	categories: ICategory[];
	products: IProduct[];
	loading: boolean;
}

export interface State {
	readonly [dashboardFeatureKey]: IDashboardState;
}

export const initialState: IDashboardState = {
	categories: [],
	products: [],
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
	on(ProductActions.loadProducts, state => {
		return {
			...state,
			loading: true,
		};
	}),
	on(ProductActions.loadProductsSuccess, (state, actions) => {
		return {
			...state,
			products: actions.payload.data,
			loading: false,
		};
	}),
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
