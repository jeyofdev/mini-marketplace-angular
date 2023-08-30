import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs';
import { CartService } from '../../../../shared/service/cart.service';
import { CartActions } from '../actions/cart-index.actions';

@Injectable()
export class CartDeliveryEffects {
	addDeliveryToCart$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CartActions.delivery.addDeliveryToCart),
			mergeMap(async ({ payload: { data } }) =>
				this.cartService
					.addDeliveryToCart(data)
					.then(() =>
						CartActions.delivery.addDeliveryToCartSuccess({
							payload: { data },
						}),
					)
					.catch(error =>
						CartActions.delivery.addDeliveryToCartFailure({
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
