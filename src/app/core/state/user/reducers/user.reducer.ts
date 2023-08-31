import { MetaReducer, combineReducers } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { log } from './cart.meta-reducer';

import {
	IUserListState,
	UserListFeatureKey,
	initialUserListState,
	listReducer,
} from './user-list.reducer';
import {
	IUserInitState,
	UserInitFeatureKey,
	initialUserInitState,
	userInitReducer,
} from './user-init.reducer';

export const userFeatureKey = 'user';

export interface IUserState {
	[UserListFeatureKey]: IUserListState;
	[UserInitFeatureKey]: IUserInitState;
}

export const initialUserState: IUserState = {
	[UserListFeatureKey]: initialUserListState,
	[UserInitFeatureKey]: initialUserInitState,
};

export const reducers = combineReducers(
	{
		[UserListFeatureKey]: listReducer,
		[UserInitFeatureKey]: userInitReducer,
	},
	initialUserState,
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
