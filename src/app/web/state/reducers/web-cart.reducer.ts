import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../../shared/model/product.model';
import { WebActions } from '../actions/web-index.actions';

export const webCartFeatureKey = 'cart';

export interface IWebCartState {
	products: Partial<IProduct>[];
	loading: boolean;
}

export interface State {
	readonly [webCartFeatureKey]: IWebCartState;
}

export const initialCartState: IWebCartState = {
	products: [],
	loading: false,
};

export const cartReducer = createReducer(
	initialCartState,

	on(WebActions.cart.addProductToCart, (state, actions) => {
		return {
			...state,
			products: [...state.products, actions.payload.data],
			loading: false,
		};
	}),
);
