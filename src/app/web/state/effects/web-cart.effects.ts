import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs';
import { WebActions } from '../actions/web-index.actions';
import { CartService } from '../../../shared/service/cart.service';

@Injectable()
export class WebCartEffects {
	addProductToCart$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WebActions.cart.addProductToCart),
			mergeMap(async ({ payload: { data } }) =>
				this.cartService
					.addItemToCart(data)
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

	constructor(
		private actions$: Actions,
		private cartService: CartService,
	) {}
}
