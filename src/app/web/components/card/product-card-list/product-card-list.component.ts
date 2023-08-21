import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../shared/model/product.model';
import { CurrencyEnum } from 'src/app/shared/enum/properties.enum';

@Component({
	selector: 'app-product-card-list',
	templateUrl: './product-card-list.component.html',
	styleUrls: ['./product-card-list.component.scss'],
})
export class ProductCardListComponent {
	@Input() product!: IProduct;

	currencyEnum = CurrencyEnum;
}
