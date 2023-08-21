import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../shared/model/product.model';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() products!: any | IProduct;
	@Input() loading!: boolean;
}
