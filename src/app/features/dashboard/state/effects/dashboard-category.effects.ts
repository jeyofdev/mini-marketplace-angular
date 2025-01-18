import { CategoryService } from '@shared/service/category.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ICategory } from '@shared/model/category.model';
import { DashboardActions } from '@dashboard/state/actions/dashboard-index.actions';

@Injectable()
export class DashboardCategoryEffects {
	getAllCategories$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.categories.loadCategories),
			mergeMap(() =>
				this.categoryService.getAll().pipe(
					map((categories: ICategory[]) =>
						DashboardActions.categories.loadCategoriesSuccess({
							payload: { data: categories },
						}),
					),
					catchError(error =>
						of(
							DashboardActions.categories.loadCategoriesFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	addCategory$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.categories.addCategory),
			mergeMap(async ({ payload: { data } }) =>
				this.categoryService
					.add(data)
					.then(() =>
						DashboardActions.categories.addCategorySuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						DashboardActions.categories.addCategoryFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	updateCategory$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.categories.updateCategory),
			mergeMap(async ({ payload: { id, data } }) =>
				this.categoryService
					.updateById(id, data)
					.then(() =>
						DashboardActions.categories.updateCategorySuccess({
							payload: { id, data },
						}),
					)
					.catch(error =>
						DashboardActions.categories.updateCategoryFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	deleteCategory$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.categories.deleteCategory),
			mergeMap(async ({ payload: { id } }) =>
				this.categoryService
					.deleteById(id)
					.then(() =>
						DashboardActions.categories.deleteCategorySuccess({
							payload: { id },
						}),
					)
					.catch(error =>
						DashboardActions.categories.deleteCategoryFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	constructor(
		private actions$: Actions,
		private categoryService: CategoryService,
	) {}
}
