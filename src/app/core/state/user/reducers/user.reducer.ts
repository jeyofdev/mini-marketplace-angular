import { MetaReducer, combineReducers } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { log } from './cart.meta-reducer';

import {
	IUserListState,
	UserListFeatureKey,
	initialUserListState,
	listReducer,
} from './user-list.reducer';

export const userFeatureKey = 'user';

export interface IUserState {
	[UserListFeatureKey]: IUserListState;
}

export const initialCartState: IUserState = {
	[UserListFeatureKey]: initialUserListState,
};

export const reducers = combineReducers(
	{
		[UserListFeatureKey]: listReducer,
	},
	initialCartState,
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
