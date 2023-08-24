import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { WebActions } from '../../state/actions/web-index.actions';
import {
	getWebProductsCartLoadingSelector,
	getWebProductsCartSelector,
} from '../../state/selectors/web-cart.selectors';
import { Observable, map } from 'rxjs';
import { ICartProduct } from 'src/app/shared/model/cart.model';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	cartProducts!: ICartProduct[];
	loading$!: Observable<boolean>;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(WebActions.cart.loadProductsInCart());

		this.loading$ = this.store.pipe(select(getWebProductsCartLoadingSelector));

		this.store
			.pipe(
				select(getWebProductsCartSelector),
				map(cartProducts => {
					this.cartProducts = cartProducts;
				}),
			)
			.subscribe();
	}
}
