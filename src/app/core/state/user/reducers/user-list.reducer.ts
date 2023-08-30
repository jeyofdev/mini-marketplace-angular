import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../../../shared/model/product.model';
import { UserActions } from '../actions/user-index.actions';

export const UserListFeatureKey = 'lists';

export interface IUserListState {
	products: IProduct[];
	loading: boolean;
}

export interface State {
	readonly [UserListFeatureKey]: IUserListState;
}

export const initialUserListState: IUserListState = {
	products: [],
	loading: false,
};

export const listReducer = createReducer(
	initialUserListState,

	on(UserActions.list.addProductToUserList, (state, actions) => {
		return {
			...state,
			products: [...state.products, actions.payload.data],
			loading: false,
		};
	}),
);
