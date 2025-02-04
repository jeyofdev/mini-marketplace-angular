import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { WebActions } from '@core/state/web/actions/web-index.actions';
import { ProductService } from '@shared/service/product.service';
import { IProduct } from '@shared/model/product.model';

@Injectable()
export class WebProductEffects {
	getAllProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WebActions.products.loadProducts),
			mergeMap(() =>
				this.productService.getAll().pipe(
					map((products: IProduct[]) =>
						WebActions.products.loadProductsSuccess({
							payload: { data: products },
						}),
					),
					catchError(error =>
						of(
							WebActions.products.loadProductsFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	getAllActiveProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WebActions.products.loadProductsActive),
			mergeMap(() =>
				this.productService.getAll().pipe(
					map((products: IProduct[]) =>
						WebActions.products.loadProductsActiveSuccess({
							payload: { data: products },
						}),
					),
					catchError(error =>
						of(
							WebActions.products.loadProductsActiveFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	getCurrentProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WebActions.products.loadProduct),
			mergeMap(({ payload: { id } }) =>
				this.productService.getById(id).pipe(
					map((products: IProduct) =>
						WebActions.products.loadProductSuccess({
							payload: { data: products },
						}),
					),
					catchError(error =>
						of(
							WebActions.products.loadProductFailure({
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
		private productService: ProductService,
	) {}
}
