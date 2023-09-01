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

	constructor(
		private actions$: Actions,
		private userListService: UserListService,
	) {}
}
