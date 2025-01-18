import { createActionGroup, props } from '@ngrx/store';
import {
	ICartDelivery,
	ISaveCartDelivery,
} from '@shared/model/cart/cart-delivery.model';

export const CartDeliveryActions = createActionGroup({
	source: 'Cart delivery',
	events: {
		'Add delivery to cart': props<{ payload: { data: ISaveCartDelivery } }>(),
		'Add delivery to cart Success': props<{
			payload: { data: ICartDelivery };
		}>(),
		'Add delivery to cart Failure': props<{ payload: { error: unknown } }>(),
	},
});
