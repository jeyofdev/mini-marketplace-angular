import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	IUserState,
	userFeatureKey,
} from '@core/state/user/reducers/user.reducer';

export const SELECT_USER_FEATURE =
	createFeatureSelector<IUserState>(userFeatureKey);

export const getUserListLoadingSelector = createSelector(
	SELECT_USER_FEATURE,
	(state: IUserState) => state.list.loading,
);

export const getUserListSelector = createSelector(
	SELECT_USER_FEATURE,
	(state: IUserState) => state.list.products,
);
