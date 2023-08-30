/* eslint-disable no-console */
import { ActionReducer } from '@ngrx/store';
import { IUserState } from './user.reducer';

export const log = (
	reducer: ActionReducer<IUserState>,
): ActionReducer<IUserState> => {
	return (state, action) => {
		const currentState = reducer(state, action);

		console.groupCollapsed(action.type);

		console.log('action', action);
		console.log('prev state', state);
		console.log('next state', currentState);

		console.groupEnd();

		return currentState;
	};
};
