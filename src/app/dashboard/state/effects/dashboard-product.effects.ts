import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from '../../../shared/service/product.service';
import { IProduct } from '../../../shared/model/product.model';
import { DashboardActions } from '../actions/dashboard-index.actions';

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

	constructor(
		private actions$: Actions,
		private productService: ProductService,
	) {}
}
