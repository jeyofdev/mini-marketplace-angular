import { createActionGroup, props } from '@ngrx/store';
import { IUser } from '../../../../core/model/user.model';

export const UserInformationsActions = createActionGroup({
	source: 'User init',
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

		'Load user': props<{ payload: { userId: string } }>(),
		'Load user Success': props<{ payload: { data: IUser } }>(),
		'Load user Failure': props<{ payload: { error: unknown } }>(),
	},
});
