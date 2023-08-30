import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from '../../../../shared/model/product.model';

export const WebProductActions = createActionGroup({
	source: 'Web Product',
	events: {
		'Load products': emptyProps(),
		'Load products Success': props<{ payload: { data: IProduct[] } }>(),
		'Load products Failure': props<{ payload: { error: unknown } }>(),

		'Load products active': emptyProps(),
		'Load products active Success': props<{ payload: { data: IProduct[] } }>(),
		'Load products active Failure': props<{ payload: { error: unknown } }>(),

		'Load product': props<{ payload: { id: string } }>(),
		'Load product Success': props<{ payload: { data: IProduct } }>(),
		'Load product Failure': props<{ payload: { error: unknown } }>(),
	},
});
