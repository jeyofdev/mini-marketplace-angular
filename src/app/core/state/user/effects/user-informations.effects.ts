import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserActions } from '@core/state/user/actions/user-index.actions';
import { UserInformationsService } from '@core/service/user-informations.service';

@Injectable()
export class UserInformationsEffects {
	addProfile$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.informations.addUser),
			mergeMap(({ payload: { userId, data } }) =>
				this.userInformationsService.addUser(userId, data).pipe(
					map(() =>
						UserActions.informations.addUserSuccess({
							payload: { userId, data },
						}),
					),
					catchError(error =>
						of(
							UserActions.informations.addUserFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	getUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.informations.loadUser),
			mergeMap(({ payload: { userId } }) =>
				this.userInformationsService.getUserById(userId).pipe(
					map(data =>
						UserActions.informations.loadUserSuccess({
							payload: { data },
						}),
					),
					catchError(error =>
						of(
							UserActions.informations.loadUserFailure({
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
		private userInformationsService: UserInformationsService,
	) {}
}
