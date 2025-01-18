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
			mergeMap(({ payload: { data } }) =>
				this.productService.add(data).pipe(
					map(docRef =>
						DashboardActions.products.addProductSuccess({
							payload: { data: { ...data, id: docRef.id } },
						}),
					),
					catchError(error =>
						of(
							DashboardActions.products.addProductFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	updateProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.products.updateProduct),
			mergeMap(({ payload: { id, data } }) =>
				this.productService.updateById(id, data).pipe(
					map(() =>
						DashboardActions.products.updateProductSuccess({
							payload: { id, data },
						}),
					),
					catchError(error =>
						of(
							DashboardActions.products.updateProductFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	deleteProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(DashboardActions.products.deleteProduct),
			mergeMap(({ payload: { id } }) =>
				this.productService.deleteById(id).pipe(
					map(() =>
						DashboardActions.products.deleteProductSuccess({
							payload: { id },
						}),
					),
					catchError(error =>
						of(
							DashboardActions.products.deleteProductFailure({
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
		private productService: ProductService,
	) {}
}
