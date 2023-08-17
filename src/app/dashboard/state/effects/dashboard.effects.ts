/* eslint-disable no-console */
import { CategoryService } from './../../../shared/service/category.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CategoryActions, ProductActions } from '../actions/dashboard.actions';
import { ICategory } from '../../../shared/model/category.model';
import { ProductService } from '../../../shared/service/product.service';
import { IProduct } from '../../../shared/model/product.model';

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

	addCategory$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CategoryActions.addCategory),
			mergeMap(async ({ payload: { data } }) =>
				this.categoryService
					.add(data)
					.then(() =>
						CategoryActions.addCategorySuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						CategoryActions.addCategoryFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	updateCategory$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CategoryActions.updateCategory),
			mergeMap(async ({ payload: { id, data } }) =>
				this.categoryService
					.updateById(id, data)
					.then(() =>
						CategoryActions.updateCategorySuccess({
							payload: { id, data },
						}),
					)
					.catch(error =>
						CategoryActions.addCategoryFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	getAllProducts$ = createEffect(() => {
		return this.actions$.pipe(
			tap(value => console.log('actions', value)),
			ofType(ProductActions.loadProducts),
			mergeMap(() =>
				this.productService.getAll().pipe(
					map((products: IProduct[]) =>
						ProductActions.loadProductsSuccess({
							payload: { data: products },
						}),
					),
					catchError(error =>
						of(
							ProductActions.loadProductsFailure({
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
		private productService: ProductService,
	) {}
}
