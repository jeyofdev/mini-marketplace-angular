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
	IUserInformationsState,
	UserInformationsFeatureKey,
	initialUserInformationsState,
	userInformationsReducer,
} from './user-informations.reducer';

export const userFeatureKey = 'user';

export interface IUserState {
	[UserListFeatureKey]: IUserListState;
	[UserInformationsFeatureKey]: IUserInformationsState;
}

export const initialUserState: IUserState = {
	[UserListFeatureKey]: initialUserListState,
	[UserInformationsFeatureKey]: initialUserInformationsState,
};

export const reducers = combineReducers(
	{
		[UserListFeatureKey]: listReducer,
		[UserInformationsFeatureKey]: userInformationsReducer,
	},
	initialUserState,
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
