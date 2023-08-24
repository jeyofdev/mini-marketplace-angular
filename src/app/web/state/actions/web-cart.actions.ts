import { createActionGroup, props } from '@ngrx/store';
import { ICartProduct } from 'src/app/shared/model/cart.model';

export const WebCartActions = createActionGroup({
	source: 'Web Cart',
	events: {
		'Add product to cart': props<{ payload: { data: ICartProduct } }>(),
		'Add product to cart Success': props<{
			payload: { data: ICartProduct };
		}>(),
		'Add product to cart Failure': props<{ payload: { error: unknown } }>(),
	},
});
