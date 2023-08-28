import { Component, Input, OnInit } from '@angular/core';
import { IImage } from '../../../../shared/model/image.model';
import { ICartProduct } from 'src/app/shared/model/cart.model';
import { Store } from '@ngrx/store';
import { WebActions } from 'src/app/web/state/actions/web-index.actions';

@Component({
	selector: 'app-card-product-cart',
	templateUrl: './card-product-cart.component.html',
	styleUrls: ['./card-product-cart.component.scss'],
})
export class CardProductCartComponent implements OnInit {
	@Input() image!: IImage;
	@Input() product!: ICartProduct;

	productPriceTotal!: number;
	productNumber!: number;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.productNumber = this.product.quantity;
		this.setProductPriceTotal();
	}

	onChange(): void {
		this.setProductPriceTotal();
	}

	deleteProductInCart(productId: string | undefined): void {
		this.store.dispatch(
			WebActions.cart.deleteProductToCart({
				payload: {
					id: productId as string,
				},
			}),
		);
	}

	private setProductPriceTotal(): void {
		this.productPriceTotal = this.product.price * this.productNumber;
	}
}
