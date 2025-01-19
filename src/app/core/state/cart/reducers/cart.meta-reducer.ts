/* eslint-disable no-console */
import { ActionReducer } from '@ngrx/store';
import { ICartState } from '@core/state/cart/reducers/cart.reducer';

export const log = (
	reducer: ActionReducer<ICartState>,
): ActionReducer<ICartState> => {
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
