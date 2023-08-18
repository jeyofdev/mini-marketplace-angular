import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../../shared/model/product.model';
import { DashboardActions } from '../actions/dashboard-index.actions';

export const dashboardProductFeatureKey = 'products';

export interface IDashboardProductState {
	data: IProduct[];
	loading: boolean;
}

export interface State {
	readonly [dashboardProductFeatureKey]: IDashboardProductState;
}

export const initialProductState: IDashboardProductState = {
	data: [],
	loading: false,
};

export const productReducer = createReducer(
	initialProductState,

	on(DashboardActions.products.loadProducts, state => {
		return {
			...state,
			loading: true,
		};
	}),

	on(DashboardActions.products.loadProductsSuccess, (state, actions) => {
		return {
			...state,
			data: actions.payload.data,
			loading: false,
		};
	}),

	on(DashboardActions.products.addProduct, (state, actions) => {
		return {
			...state,
			data: [...state.data, actions.payload.data],
			loading: false,
		};
	}),
);
