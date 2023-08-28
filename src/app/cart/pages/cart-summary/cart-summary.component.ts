import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IRowsPerPageSelectOptions } from '../../../shared/interfaces/table.interface';

import { Observable, map } from 'rxjs';
import { ICartProduct } from '../../../shared/model/cart.model';
import { DataService } from '../../../shared/service/data.service';
import { IImage } from '../../../shared/model/image.model';
import {
	getCartProductsLoadingSelector,
	getCartProductsSelector,
} from '../../../core/state/selectors/cart-product.selectors';
import { CartActions } from '../../../core/state/actions/cart-index.actions';

@Component({
	selector: 'app-cart-summary',
	templateUrl: './cart-summary.component.html',
	styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
	cartProducts!: ICartProduct[];
	loading$!: Observable<boolean>;

	totalPriceProducts!: number;
	totalDelivery!: number;
	totalCart!: number;

	rowsPerPageOptions!: IRowsPerPageSelectOptions[];

	image!: IImage;

	constructor(
		private store: Store,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.initImage();
		this.totalDelivery = 0;
		this.rowsPerPageOptions = this.dataService.getRowsPerPageSelectOptions();

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

	private initImage(): void {
		this.image = {
			src: 'assets/img/auth/login.jpg',
			alt: '',
			position: 'top',
		};
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
