import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserActions } from '../actions/user-index.actions';
import { UserService } from '../../../service/user.service';

@Injectable()
export class UserListEffects {
	addProductInList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.list.addProductInUserList),
			mergeMap(async ({ payload: { data } }) =>
				this.userService
					.addProductInList(data)
					.then(() =>
						UserActions.list.addProductInUserListSuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						UserActions.list.addProductInUserListFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	getAllProductInList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.list.loadProductsInUserList),
			mergeMap(() =>
				this.userService.getAllProductInList().pipe(
					map(products => {
						return UserActions.list.loadProductsInUserListSuccess({
							payload: { data: products },
						});
					}),
					catchError(error =>
						of(
							UserActions.list.loadProductsInUserListFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	constructor(
		private actions$: Actions,
		private userService: UserService,
	) {}
}
