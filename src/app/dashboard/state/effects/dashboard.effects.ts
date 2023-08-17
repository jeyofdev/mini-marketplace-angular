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

	addCategories$ = createEffect(() => {
		return this.actions$.pipe(
			tap(value => console.log('actions', value)),
			ofType(CategoryActions.addCategories),
			mergeMap(async ({ payload: { data } }) =>
				this.categoryService
					.add(data)
					.then(() =>
						CategoryActions.addCategoriesSuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						CategoryActions.addCategoriesFailure({
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
