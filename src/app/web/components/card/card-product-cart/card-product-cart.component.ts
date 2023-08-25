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

	itemNumber!: number;

	ngOnInit(): void {
		this.itemNumber = 1;
	}
}
