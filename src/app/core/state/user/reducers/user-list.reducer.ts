import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../../../shared/model/product.model';
import { UserActions } from '../actions/user-index.actions';

export const UserListFeatureKey = 'list';

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

	on(UserActions.list.addProductInUserList, (state, actions) => {
		return {
			...state,
			products: [...state.products, actions.payload.newProduct],
			loading: false,
		};
	}),

	on(UserActions.list.loadUserListSuccess, (state, actions) => {
		return {
			...state,
			products: actions.payload.data,
			loading: false,
		};
	}),

	on(UserActions.list.deleteProductInUserList, (state, actions) => {
		return {
			...state,
			products: state.products.filter(
				product => product.id !== actions.payload.product.id,
			),
			loading: false,
		};
	}),
);
