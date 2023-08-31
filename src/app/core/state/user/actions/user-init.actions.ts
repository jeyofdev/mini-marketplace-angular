import { createActionGroup, props } from '@ngrx/store';
import { IUser } from '../../../../core/model/user.model';

export const UserInitActions = createActionGroup({
	source: 'User profile',
	events: {
		'Add user': props<{
			payload: { userId: string; data: IUser };
		}>(),
		'Add user Success': props<{
			payload: { userId: string; data: IUser };
		}>(),
		'Add user Failure': props<{
			payload: { error: unknown };
		}>(),
	},
});
