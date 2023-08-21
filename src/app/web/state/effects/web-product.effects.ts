import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from '../../../shared/service/product.service';
import { IProduct } from '../../../shared/model/product.model';
import { WebActions } from '../actions/web-index.actions';

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

	constructor(
		private actions$: Actions,
		private productService: ProductService,
	) {}
}
