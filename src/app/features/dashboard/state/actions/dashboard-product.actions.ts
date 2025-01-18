import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct, ISaveProduct } from '@shared/model/product.model';

export const DashboardProductActions = createActionGroup({
	source: 'Product',
	events: {
		'Load products': emptyProps(),
		'Load products Success': props<{ payload: { data: IProduct[] } }>(),
		'Load products Failure': props<{ payload: { error: unknown } }>(),

		'Add product': props<{ payload: { data: ISaveProduct } }>(),
		'Add product Success': props<{ payload: { data: IProduct } }>(),
		'Add product Failure': props<{ payload: { error: unknown } }>(),

		'Update Product': props<{ payload: { id: string; data: ISaveProduct } }>(),
		'Update Product Success': props<{
			payload: { id: string; data: ISaveProduct };
		}>(),
		'Update Product Failure': props<{ payload: { error: unknown } }>(),

		'Delete product': props<{ payload: { id: string } }>(),
		'Delete product Success': props<{ payload: { id: string } }>(),
		'Delete product Failure': props<{ payload: { error: unknown } }>(),
	},
});
