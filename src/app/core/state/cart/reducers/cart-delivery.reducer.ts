import { createReducer, on } from '@ngrx/store';
import { ICartDelivery } from '../../../../shared/model/cart.model';
import { CartActions } from '../actions/cart-index.actions';

export const CartDeliveryFeatureKey = 'delivery';

export interface ICartDeliveryState {
	data: ICartDelivery[];
	loading: boolean;
}

export interface State {
	readonly [CartDeliveryFeatureKey]: ICartDeliveryState;
}

export const initialCartDeliveryState: ICartDeliveryState = {
	data: [],
	loading: false,
};

export const deliveryReducer = createReducer(
	initialCartDeliveryState,

	on(CartActions.delivery.addDeliveryToCart, (state, actions) => {
		return {
			...state,
			data: [...state.data, actions.payload.data],
			loading: false,
		};
	}),
);
