import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs';
import { UserActions } from '../actions/user-index.actions';
import { UserService } from 'src/app/shared/service/user.service';

@Injectable()
export class UserListEffects {
	addProductToList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.list.addProductToUserList),
			mergeMap(async ({ payload: { data } }) =>
				this.userService
					.addProductToList(data)
					.then(() =>
						UserActions.list.addProductToUserListSuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						UserActions.list.addProductToUserListFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	constructor(
		private actions$: Actions,
		private userService: UserService,
	) {}
}
