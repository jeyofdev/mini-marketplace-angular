import { createReducer, on } from '@ngrx/store';
import { CartActions } from '@core/state/cart/actions/cart-index.actions';
import { ICartDelivery } from '@shared/model/cart/cart-delivery.model';

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
