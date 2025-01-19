import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	IUserState,
	userFeatureKey,
} from '@core/state/user/reducers/user.reducer';

export const SELECT_USER_FEATURE =
	createFeatureSelector<IUserState>(userFeatureKey);

export const getUserInformationsSelector = createSelector(
	SELECT_USER_FEATURE,
	(state: IUserState) => state.informations,
);
