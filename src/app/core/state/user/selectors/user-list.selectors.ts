import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState, userFeatureKey } from '../reducers/user.reducer';

export const SELECT_USER_FEATURE =
	createFeatureSelector<IUserState>(userFeatureKey);

export const getUserListLoadingSelector = createSelector(
	SELECT_USER_FEATURE,
	(state: IUserState) => state.lists.loading,
);

export const getUserListSelector = createSelector(
	SELECT_USER_FEATURE,
	(state: IUserState) => state.lists.products,
);
