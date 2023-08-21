import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../../shared/model/product.model';
import { WebActions } from '../actions/web-index.actions';

export const webProductFeatureKey = 'products';

export interface IWebProductState {
	data: IProduct[];
	loading: boolean;
}

export interface State {
	readonly [webProductFeatureKey]: IWebProductState;
}

export const initialProductState: IWebProductState = {
	data: [],
	loading: false,
};

export const productReducer = createReducer(
	initialProductState,

	on(WebActions.products.loadProducts, state => {
		return {
			...state,
			loading: true,
		};
	}),

	on(WebActions.products.loadProductsSuccess, (state, actions) => {
		return {
			...state,
			data: actions.payload.data,
			loading: false,
		};
	}),
);
