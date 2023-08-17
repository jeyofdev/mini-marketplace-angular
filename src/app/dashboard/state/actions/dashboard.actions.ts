import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICategory } from '../../../shared/model/category.model';
import { IProduct } from '../../../shared/model/product.model';

export const CategoryActions = createActionGroup({
	source: 'Category',
	events: {
		'Load Categories': emptyProps(),
		'Load Categories Success': props<{ payload: { data: ICategory[] } }>(),
		'Load Categories Failure': props<{ payload: { error: unknown } }>(),

		'Add Categories': props<{ payload: { data: ICategory } }>(),
		'Add Categories Success': props<{ payload: { data: ICategory } }>(),
		'Add Categories Failure': props<{ payload: { error: unknown } }>(),
	},
});

export const ProductActions = createActionGroup({
	source: 'Product',
	events: {
		'Load products': emptyProps(),
		'Load products Success': props<{ payload: { data: IProduct[] } }>(),
		'Load products Failure': props<{ payload: { error: unknown } }>(),
	},
});
