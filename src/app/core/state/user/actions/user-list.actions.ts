import { createActionGroup, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/model/product.model';

export const UserListActions = createActionGroup({
	source: 'User list',
	events: {
		// 'Load products in user list': emptyProps(),
		// 'Load products in user list Success': props<{
		// 	payload: { data: IProduct[] };
		// }>(),
		// 'Load products in user list Failure': props<{
		// 	payload: { error: unknown };
		// }>(),

		'Add product in user list': props<{
			payload: { userId: string; newProduct: IProduct };
		}>(),
		'Add product in user list Success': props<{
			payload: { userId: string; newProduct: IProduct };
		}>(),
		'Add product in user list Failure': props<{
			payload: { error: unknown };
		}>(),
	},
});
