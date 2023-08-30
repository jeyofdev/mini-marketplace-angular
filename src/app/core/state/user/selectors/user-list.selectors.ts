import { createFeatureSelector } from '@ngrx/store';
import { IUserState, userFeatureKey } from '../reducers/user.reducer';

export const SELECT_USER_FEATURE =
	createFeatureSelector<IUserState>(userFeatureKey);
