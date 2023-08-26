import { Component, OnInit } from '@angular/core';
import { ICartProduct } from '../../../shared/model/cart.model';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IImage } from '../../../shared/model/image.model';
import { WebActions } from '../../state/actions/web-index.actions';
import {
	getWebProductsCartLoadingSelector,
	getWebProductsCartSelector,
} from '../../state/selectors/web-cart.selectors';
import { IRowsPerPageSelectOptions } from '../../../shared/interfaces/table.interface';
import { DataService } from '../../../shared/service/data.service';

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
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

		this.store.dispatch(WebActions.cart.loadProductsInCart());
		this.loading$ = this.store.pipe(select(getWebProductsCartLoadingSelector));

		this.store
			.pipe(
				select(getWebProductsCartSelector),
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
