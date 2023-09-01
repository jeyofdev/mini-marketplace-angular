import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserActions } from '../actions/user-index.actions';
import { mergeMap } from 'rxjs';
import { UserListService } from 'src/app/core/service/user-list.service';

@Injectable()
export class UserListEffects {
	addProductInList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.list.addProductInUserList),
			mergeMap(async ({ payload: { userId, newProduct } }) =>
				this.userListService
					.addProductInList(userId, newProduct)
					.then(() =>
						UserActions.list.addProductInUserListSuccess({
							payload: { userId, newProduct },
						}),
					)
					.catch(error => {
						return UserActions.list.addProductInUserListFailure({
							payload: { error: error.body.error },
						});
					}),
			),
		);
	});

	getAllProductInList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.list.loadUserList),
			mergeMap(({ payload: { userId } }) =>
				this.userListService
					.getListProductsByUserId(userId)
					.then(data =>
						UserActions.list.loadUserListSuccess({
							payload: { data },
						}),
					)
					.catch(error => {
						return UserActions.list.loadUserListFailure({
							payload: { error: error.body.error },
						});
					}),
			),
		);
	});

	deleteProductInList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.list.deleteProductInUserList),
			mergeMap(async ({ payload: { userId, product } }) =>
				this.userListService
					.deleteProductInList(userId, product)
					.then(() =>
						UserActions.list.deleteProductInUserListSuccess({
							payload: { userId, product },
						}),
					)
					.catch(error => {
						return UserActions.list.deleteProductInUserListFailure({
							payload: { error: error.body.error },
						});
					}),
			),
		);
	});

	constructor(
		private actions$: Actions,
		private userListService: UserListService,
	) {}
}
