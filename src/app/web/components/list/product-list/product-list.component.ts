import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../shared/model/product.model';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
	@Input() products!: IProduct[];
	@Input() loading!: boolean;
}
