import { CategoryService } from './../../../shared/service/category.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ICategory } from '../../../shared/model/category.model';
import { WebActions } from '../actions/web-index.actions';

@Injectable()
export class WebCategoryEffects {
	getAllCategories$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WebActions.categories.loadCategories),
			mergeMap(() =>
				this.categoryService.getAll().pipe(
					map((categories: ICategory[]) =>
						WebActions.categories.loadCategoriesSuccess({
							payload: { data: categories },
						}),
					),
					catchError(error =>
						of(
							WebActions.categories.loadCategoriesFailure({
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
