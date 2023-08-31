import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs';
import { UserActions } from '../actions/user-index.actions';
import { UserService } from '../../../service/user.service';

@Injectable()
export class UserInitEffects {
	addProfile$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.init.addUser),
			mergeMap(async ({ payload: { userId, data } }) =>
				this.userService
					.addUser(userId, data)
					.then(() =>
						UserActions.init.addUserSuccess({
							payload: { userId, data },
						}),
					)
					.catch(error =>
						UserActions.init.addUserFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	getUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.init.loadUser),
			mergeMap(({ payload: { userId } }) =>
				this.userService
					.getUserById(userId)
					.then(data =>
						UserActions.init.loadUserSuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						UserActions.init.loadUserFailure({
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
