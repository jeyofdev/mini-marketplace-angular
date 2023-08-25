import { Component, Input } from '@angular/core';
import { CurrencyEnum } from '../../../../shared/enum/properties.enum';
import { ICartProduct } from '../../../../shared//model/cart.model';

@Component({
	selector: 'app-card-product-list',
	templateUrl: './card-product-list.component.html',
	styleUrls: ['./card-product-list.component.scss'],
})
export class CardProductListComponent {
	@Input() product!: ICartProduct;

	currencyEnum = CurrencyEnum;
}
