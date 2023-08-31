import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState, userFeatureKey } from '../reducers/user.reducer';

export const SELECT_USER_FEATURE =
	createFeatureSelector<IUserState>(userFeatureKey);

export const getWebCurrentProductSelector = createSelector(
	SELECT_USER_FEATURE,
	(state: IUserState) => state.data,
);
