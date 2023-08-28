import { createReducer, on } from '@ngrx/store';
import { ICartProduct } from 'src/app/shared/model/cart.model';
import { CartActions } from '../actions/cart-index.actions';

export const CartProductFeatureKey = 'products';

export interface ICartProductState {
	data: ICartProduct[];
	loading: boolean;
}

export interface State {
	readonly [CartProductFeatureKey]: ICartProductState;
}

export const initialCartProductState: ICartProductState = {
	data: [],
	loading: false,
};

export const productReducer = createReducer(
	initialCartProductState,

	on(CartActions.products.loadProductsInCart, state => {
		return {
			...state,
			loading: true,
		};
	}),

	on(CartActions.products.loadProductsInCartSuccess, (state, actions) => {
		return {
			...state,
			data: actions.payload.data,
			loading: false,
		};
	}),

	on(CartActions.products.addProductToCart, (state, actions) => {
		return {
			...state,
			data: [...state.data, actions.payload.data],
			loading: false,
		};
	}),

	on(CartActions.products.deleteProductToCartSuccess, (state, actions) => {
		return {
			...state,
			products: state.data.filter(product => product.id !== actions.payload.id),
		};
	}),
);
