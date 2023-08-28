import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CartService } from '../../../shared/service/cart.service';
import { CartActions } from '../actions/cart-index.actions';

@Injectable()
export class CartEffects {
	addProductToCart$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CartActions.products.addProductToCart),
			mergeMap(async ({ payload: { data } }) =>
				this.cartService
					.addProductToCart(data)
					.then(() =>
						CartActions.products.addProductToCartSuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						CartActions.products.addProductToCartFailure({
							payload: { error: error.body.error },
						}),
					),
			),
		);
	});

	getAllProductInCart$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CartActions.products.loadProductsInCart),
			mergeMap(() =>
				this.cartService.getAllProductsInCart().pipe(
					map(products =>
						CartActions.products.loadProductsInCartSuccess({
							payload: { data: products },
						}),
					),
					catchError(error =>
						of(
							CartActions.products.loadProductsInCartFailure({
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
			ofType(CartActions.products.deleteProductToCart),
			mergeMap(async ({ payload: { id } }) =>
				this.cartService
					.deleteProductById(id)
					.then(() =>
						CartActions.products.deleteProductToCartSuccess({
							payload: { id },
						}),
					)
					.catch(error =>
						CartActions.products.deleteProductToCartFailure({
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
