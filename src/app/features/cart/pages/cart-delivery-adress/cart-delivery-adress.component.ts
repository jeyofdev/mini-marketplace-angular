import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CartActions } from '@core/state/cart/actions/cart-index.actions';
import {
	getCartProductsLoadingSelector,
	getCartProductsSelector,
} from '@core/state/cart/selectors/cart-product.selectors';
import { ICartProduct } from '@shared/model/cart.model';

@Component({
	selector: 'app-cart-delivery-adress',
	templateUrl: './cart-delivery-adress.component.html',
	styleUrls: ['./cart-delivery-adress.component.scss'],
})
export class CartDeliveryAdressComponent implements OnInit {
	cartProducts!: ICartProduct[];
	loading$!: Observable<boolean>;

	totalPriceProducts!: number;
	totalDelivery!: number;
	totalCart!: number;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.totalDelivery = 0;

		this.store.dispatch(CartActions.products.loadProductsInCart());
		this.loading$ = this.store.pipe(select(getCartProductsLoadingSelector));

		this.store
			.pipe(
				select(getCartProductsSelector),
				map(cartProducts => {
					this.cartProducts = cartProducts;
					this.totalPriceProducts = this.getTotalPriceProducts(cartProducts);
					this.totalCart = this.getTotalCart();
				}),
			)
			.subscribe();
	}

	private getTotalPriceProducts(cartProducts: ICartProduct[]): number {
		const prices = cartProducts.map(
			product => product.price * product.quantity,
		);

		return prices.reduce((acc, current) => acc + current, 0);
	}

	private getTotalCart(): number {
		return this.totalPriceProducts + this.totalDelivery;
	}
}
