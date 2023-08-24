import { createActionGroup, props } from '@ngrx/store';
import { IProduct } from '../../../shared/model/product.model';

export const WebCartActions = createActionGroup({
	source: 'Web Cart',
	events: {
		'Add product to cart': props<{ payload: { data: Partial<IProduct> } }>(),
		'Add product to cart Success': props<{
			payload: { data: Partial<IProduct> };
		}>(),
		'Add product to cart Failure': props<{ payload: { error: unknown } }>(),
	},
});
