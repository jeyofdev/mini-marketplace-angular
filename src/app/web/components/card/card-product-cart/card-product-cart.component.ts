import { Component, Input, OnInit } from '@angular/core';
import { IImage } from '../../../../shared/model/image.model';
import { ICartProduct } from 'src/app/shared/model/cart.model';

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

	ngOnInit(): void {
		this.productNumber = this.product.quantity;
		this.setProductPriceTotal();
	}

	onChange(): void {
		this.setProductPriceTotal();
	}

	private setProductPriceTotal(): void {
		this.productPriceTotal = this.product.price * this.productNumber;
	}
}
