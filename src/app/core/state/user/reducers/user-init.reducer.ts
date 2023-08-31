import { IUserAccount, IUserProfile } from './../../../model/user.model';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user-index.actions';
import { IProduct } from 'src/app/shared/model/product.model';

export const UserInitFeatureKey = 'data';

export interface IUserInitState {
	account: IUserAccount;
	profile: IUserProfile;
	list: IProduct[];
}

export interface State {
	readonly [UserInitFeatureKey]: IUserInitState;
}

export const initialUserInitState: IUserInitState = {
	account: {
		lastLogin: '',
		createdAt: '',
	},
	profile: {
		displayName: '',
		email: '',
		phone: '',
		avatar: '',
	},
	list: [],
};

export const userInitReducer = createReducer(
	initialUserInitState,

	on(UserActions.init.addUser, (state, actions) => {
		return {
			...state,
			account: actions.payload.data.account,
			profile: actions.payload.data.profile,
			list: actions.payload.data.list,
		};
	}),
);
