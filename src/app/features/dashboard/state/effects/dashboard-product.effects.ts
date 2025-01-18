import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from '@shared/service/product.service';
import { IProduct } from '@shared/model/product.model';
import { DashboardActions } from '@dashboard/state/actions/dashboard-index.actions';

@Injectable()
export class DashboardProductEffects {
	getAllProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.products.loadProducts),
			mergeMap(() =>
				this.productService.getAll().pipe(
					map((products: IProduct[]) =>
						DashboardActions.products.loadProductsSuccess({
							payload: { data: products },
						}),
					),
					catchError(error =>
						of(
							DashboardActions.products.loadProductsFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	addProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.products.addProduct),
			mergeMap(async ({ payload: { data } }) =>
				this.productService
					.add(data)
					.then(() =>
						DashboardActions.products.addProductSuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						DashboardActions.products.addProductFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	deleteProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.products.deleteProduct),
			mergeMap(async ({ payload: { id } }) =>
				this.productService
					.deleteById(id)
					.then(() =>
						DashboardActions.products.deleteProductSuccess({
							payload: { id },
						}),
					)
					.catch(error =>
						DashboardActions.products.deleteProductFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	updateProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.products.updateProduct),
			mergeMap(async ({ payload: { id, data } }) =>
				this.productService
					.updateById(id, data)
					.then(() =>
						DashboardActions.products.updateProductSuccess({
							payload: { id, data },
						}),
					)
					.catch(error =>
						DashboardActions.products.updateProductFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	constructor(
		private actions$: Actions,
		private productService: ProductService,
	) {}
}
