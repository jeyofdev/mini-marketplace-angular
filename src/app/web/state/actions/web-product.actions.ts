import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from '../../../shared/model/product.model';

export const WebProductActions = createActionGroup({
	source: 'Web Product',
	events: {
		'Load products': emptyProps(),
		'Load products Success': props<{ payload: { data: IProduct[] } }>(),
		'Load products Failure': props<{ payload: { error: unknown } }>(),
	},
});
