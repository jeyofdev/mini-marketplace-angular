import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ICartProduct } from '@shared/model/cart.model';
import { OverlayPanel } from 'primeng/overlaypanel';
import { IImage } from '@shared/model/image.model';
import { Router } from '@angular/router';
import { CartActions } from '@core/state/cart/actions/cart-index.actions';
import {
	getCartProductsLoadingSelector,
	getCartProductsSelector,
} from '@core/state/cart/selectors/cart-product.selectors';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	@ViewChild(OverlayPanel) panel!: OverlayPanel;

	cartProducts!: ICartProduct[];
	loading$!: Observable<boolean>;

	image!: IImage;

	constructor(
		private store: Store,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.initImage();

		this.store.dispatch(CartActions.products.loadProductsInCart());
		this.loading$ = this.store.pipe(select(getCartProductsLoadingSelector));

		this.store
			.pipe(
				select(getCartProductsSelector),
				map(cartProducts => {
					this.cartProducts = cartProducts;
				}),
			)
			.subscribe();
	}

	toggle(event: Event): void {
		this.panel.toggle(event);
	}

	goToCartPage(): void {
		this.router.navigateByUrl('/cart/summary');
	}

	private initImage(): void {
		this.image = {
			src: 'assets/img/auth/login.jpg',
			alt: '',
			position: 'top',
		};
	}
}
