import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
	ICartProduct,
	ISaveCartProduct,
} from '@shared/model/cart/cart-product.model';

export const CartProductActions = createActionGroup({
	source: 'Cart',
	events: {
		'Load products in cart': emptyProps(),
		'Load products in cart Success': props<{
			payload: { data: ISaveCartProduct[] };
		}>(),
		'Load products in cart Failure': props<{ payload: { error: unknown } }>(),

		'Add product to cart': props<{ payload: { data: ICartProduct } }>(),
		'Add product to cart Success': props<{
			payload: { data: ICartProduct };
		}>(),
		'Add product to cart Failure': props<{ payload: { error: unknown } }>(),

		'Delete product to cart': props<{ payload: { id: string } }>(),
		'Delete product to cart Success': props<{ payload: { id: string } }>(),
		'Delete product to cart Failure': props<{ payload: { error: unknown } }>(),
	},
});
