import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserActions } from '@core/state/user/actions/user-index.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserListService } from '@core/service/user-list.service';

@Injectable()
export class UserListEffects {
	getAllProductInList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.list.loadUserList),
			mergeMap(({ payload: { userId } }) =>
				this.userListService.getListProductsByUserId(userId).pipe(
					map(products =>
						UserActions.list.loadUserListSuccess({
							payload: { data: products },
						}),
					),
					catchError(error =>
						of(
							UserActions.list.loadUserListFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	addProductInList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.list.addProductInUserList),
			mergeMap(({ payload: { userId, newProduct } }) =>
				this.userListService.addProductInList(userId, newProduct).pipe(
					map(() =>
						UserActions.list.addProductInUserListSuccess({
							payload: { userId, newProduct },
						}),
					),
					catchError(error =>
						of(
							UserActions.list.addProductInUserListFailure({
								payload: { error: error?.message },
							}),
						),
					),
				),
			),
		);
	});

	deleteProductInList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.list.deleteProductInUserList),
			mergeMap(({ payload: { userId, product } }) =>
				this.userListService.deleteProductInList(userId, product).pipe(
					map(() =>
						UserActions.list.deleteProductInUserListSuccess({
							payload: { userId, product },
						}),
					),
					catchError(error =>
						of(
							UserActions.list.deleteProductInUserListFailure({
								payload: { error: error?.message },
							}),
						),
					),
				),
			),
		);
	});

	constructor(
		private actions$: Actions,
		private userListService: UserListService,
	) {}
}
