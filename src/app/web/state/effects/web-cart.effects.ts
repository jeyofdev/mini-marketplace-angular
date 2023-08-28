import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { WebActions } from '../actions/web-index.actions';
import { CartService } from '../../../shared/service/cart.service';
import { ICartProduct } from '../../../shared/model/cart.model';

@Injectable()
export class WebCartEffects {
	addProductToCart$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WebActions.cart.addProductToCart),
			mergeMap(async ({ payload: { data } }) =>
				this.cartService
					.addProductToCart(data)
					.then(() =>
						WebActions.cart.addProductToCartSuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						WebActions.cart.addProductToCartFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	getAllProductInCart$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WebActions.cart.loadProductsInCart),
			mergeMap(() =>
				this.cartService.getAllProductsInCart().pipe(
					map((products: ICartProduct[]) =>
						WebActions.cart.loadProductsInCartSuccess({
							payload: { data: products },
						}),
					),
					catchError(error =>
						of(
							WebActions.cart.loadProductsInCartFailure({
								payload: { error: error.body.error },
							}),
						),
					),
				),
			),
		);
	});

	deleteProductInCart$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WebActions.cart.deleteProductToCart),
			mergeMap(async ({ payload: { id } }) =>
				this.cartService
					.deleteProductById(id)
					.then(() =>
						WebActions.cart.deleteProductToCartSuccess({
							payload: { id },
						}),
					)
					.catch(error =>
						WebActions.cart.deleteProductToCartFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	constructor(
		private actions$: Actions,
		private cartService: CartService,
	) {}
}
