import { createReducer, on } from '@ngrx/store';
import { WebActions } from '../actions/web-index.actions';
import { ICartProduct } from 'src/app/shared/model/cart.model';

export const webCartFeatureKey = 'cart';

export interface IWebCartState {
	products: ICartProduct[];
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

	on(WebActions.cart.loadProductsInCart, state => {
		return {
			...state,
			loading: true,
		};
	}),

	on(WebActions.cart.loadProductsInCartSuccess, (state, actions) => {
		return {
			...state,
			products: actions.payload.data,
			loading: false,
		};
	}),

	on(WebActions.cart.addProductToCart, (state, actions) => {
		return {
			...state,
			products: [...state.products, actions.payload.data],
			loading: false,
		};
	}),
);
