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
			mergeMap(({ payload: { data } }) =>
				this.categoryService.add(data).pipe(
					map(docRef =>
						DashboardActions.categories.addCategorySuccess({
							payload: { data: { ...data, id: docRef.id } },
						}),
					),
					catchError(error =>
						of(
							DashboardActions.categories.addCategoryFailure({
								payload: { error: error?.message },
							}),
						),
					),
				),
			),
		);
	});

	updateCategory$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.categories.updateCategory),
			mergeMap(({ payload: { id, data } }) =>
				this.categoryService.updateById(id, data).pipe(
					map(() =>
						DashboardActions.categories.updateCategorySuccess({
							payload: { id, data },
						}),
					),
					catchError(error =>
						of(
							DashboardActions.categories.updateCategoryFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	deleteCategory$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.categories.deleteCategory),
			mergeMap(({ payload: { id } }) =>
				this.categoryService.deleteById(id).pipe(
					map(() =>
						DashboardActions.categories.deleteCategorySuccess({
							payload: { id },
						}),
					),
					catchError(error =>
						of(
							DashboardActions.categories.addCategoryFailure({
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
		private categoryService: CategoryService,
	) {}
}
