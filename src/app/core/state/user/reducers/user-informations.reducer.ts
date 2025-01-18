import { IUserAccount, IUserProfile } from '@core/model/user.model';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from '@core/state/user/actions/user-index.actions';

export const UserInformationsFeatureKey = 'informations';

export interface IUserInformationsState {
	account: IUserAccount;
	profile: IUserProfile;
}

export interface State {
	readonly [UserInformationsFeatureKey]: IUserInformationsState;
}

export const initialUserInformationsState: IUserInformationsState = {
	account: {
		lastLogin: '',
		createdAt: '',
	},
	profile: {
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		phone: '',
		avatar: '',
	},
};

export const userInformationsReducer = createReducer(
	initialUserInformationsState,

	on(UserActions.informations.addUser, (state, actions) => {
		return {
			...state,
			account: actions.payload.data.account,
			profile: actions.payload.data.profile,
			list: actions.payload.data.list,
		};
	}),

	on(UserActions.informations.loadUserSuccess, (state, actions) => {
		return {
			...state,
			account: actions.payload.data.account,
			profile: actions.payload.data.profile,
			list: actions.payload.data.list,
		};
	}),
);
