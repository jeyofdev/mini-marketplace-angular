import { createActionGroup, props } from '@ngrx/store';
import { IProduct } from '@shared/model/product.model';

export const UserListActions = createActionGroup({
	source: 'User list',
	events: {
		'Load user list': props<{
			payload: { userId: string };
		}>(),
		'Load user list Success': props<{
			payload: { data: IProduct[] };
		}>(),
		'Load user list Failure': props<{
			payload: { error: unknown };
		}>(),

		'Add product in user list': props<{
			payload: { userId: string; newProduct: IProduct };
		}>(),
		'Add product in user list Success': props<{
			payload: { userId: string; newProduct: IProduct };
		}>(),
		'Add product in user list Failure': props<{
			payload: { error: unknown };
		}>(),

		'Delete product in user list': props<{
			payload: { userId: string; product: IProduct };
		}>(),
		'Delete product in user list Success': props<{
			payload: { userId: string; product: IProduct };
		}>(),
		'Delete product in user list Failure': props<{
			payload: { error: unknown };
		}>(),
	},
});
