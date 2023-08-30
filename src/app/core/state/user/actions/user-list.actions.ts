import { createActionGroup, props } from '@ngrx/store';
import { IProduct } from '../../../../shared/model/product.model';

export const UserListActions = createActionGroup({
	source: 'User list',
	events: {
		'Add product to user list': props<{ payload: { data: IProduct } }>(),
		'Add product to user list Success': props<{
			payload: { data: IProduct };
		}>(),
		'Add product to user list Failure': props<{
			payload: { error: unknown };
		}>(),
	},
});
