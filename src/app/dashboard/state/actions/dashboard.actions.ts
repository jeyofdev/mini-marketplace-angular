import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICategory } from '../../../shared/model/category.model';
import { IProduct } from '../../../shared/model/product.model';

export const CategoryActions = createActionGroup({
	source: 'Category',
	events: {
		'Load Categories': emptyProps(),
		'Load Categories Success': props<{ payload: { data: ICategory[] } }>(),
		'Load Categories Failure': props<{ payload: { error: unknown } }>(),

		'Add Category': props<{ payload: { data: ICategory } }>(),
		'Add Category Success': props<{ payload: { data: ICategory } }>(),
		'Add Category Failure': props<{ payload: { error: unknown } }>(),

		'Update Category': props<{ payload: { id: string; data: ICategory } }>(),
		'Update Category Success': props<{
			payload: { id: string; data: ICategory };
		}>(),
		'Update Category Failure': props<{ payload: { error: unknown } }>(),

		'Delete Category': props<{ payload: { id: string } }>(),
		'Delete Category Success': props<{ payload: { id: string } }>(),
		'Delete Category Failure': props<{ payload: { error: unknown } }>(),
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
