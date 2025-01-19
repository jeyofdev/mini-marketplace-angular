import { createReducer, on } from '@ngrx/store';
import { CartActions } from '@core/state/cart/actions/cart-index.actions';
import { ICartProduct } from '@shared/model/cart/cart-product.model';

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
