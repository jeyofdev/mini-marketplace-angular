/* eslint-disable no-console */
import { ActionReducer, UPDATE } from '@ngrx/store';
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

export const hydration = (
	reducer: ActionReducer<IUserState>,
): ActionReducer<IUserState> => {
	return (state, action) => {
		if (
			action.type === UPDATE ||
			action.type == '[User init] Add user Success'
		) {
			const storageValue = localStorage.getItem('marketplaceUser');

			if (storageValue) {
				try {
					return JSON.parse(storageValue);
				} catch {
					localStorage.removeItem('marketplaceUser');
				}
			}
		}

		const nextState = reducer(state, action);
		localStorage.setItem('marketplaceUser', JSON.stringify(nextState));

		return nextState;
	};
};
