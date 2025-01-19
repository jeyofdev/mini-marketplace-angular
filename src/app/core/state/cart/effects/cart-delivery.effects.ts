import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CartService } from '@shared/service/cart.service';
import { CartActions } from '@core/state/cart/actions/cart-index.actions';

@Injectable()
export class CartDeliveryEffects {
	addDeliveryToCart$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CartActions.delivery.addDeliveryToCart),
			mergeMap(({ payload: { data } }) =>
				this.cartService.addDeliveryToCart(data).pipe(
					map(() =>
						CartActions.delivery.addDeliveryToCartSuccess({
							payload: { data },
						}),
					),
					catchError(error =>
						of(
							CartActions.delivery.addDeliveryToCartFailure({
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
		private cartService: CartService,
	) {}
}
