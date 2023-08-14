/* eslint-disable no-console */
import { CategoryService } from './../../../shared/service/category.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CategoryActions } from '../actions/dashboard.actions';
import { ICategory } from 'src/app/shared/model/category.model';

@Injectable()
export class DashboardEffects {
	getAllCategories$ = createEffect(() => {
		return this.actions$.pipe(
			tap(value => console.log('actions', value)),
			ofType(CategoryActions.loadCategories),
			mergeMap(() =>
				this.categoryService.getAll().pipe(
					map((categories: ICategory[]) =>
						CategoryActions.loadCategoriesSuccess({
							payload: { data: categories },
						}),
					),
					catchError(error =>
						of(
							CategoryActions.loadCategoriesFailure({
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
		private categoryService: CategoryService,
	) {}
}
