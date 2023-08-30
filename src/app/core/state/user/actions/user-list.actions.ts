import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from '../../../../shared/model/product.model';

export const UserListActions = createActionGroup({
	source: 'User list',
	events: {
		'Load products in user list': emptyProps(),
		'Load products in user list Success': props<{
			payload: { data: IProduct[] };
		}>(),
		'Load products in user list Failure': props<{
			payload: { error: unknown };
		}>(),

		'Add product in user list': props<{ payload: { data: IProduct } }>(),
		'Add product in user list Success': props<{
			payload: { data: IProduct };
		}>(),
		'Add product in user list Failure': props<{
			payload: { error: unknown };
		}>(),
	},
});
