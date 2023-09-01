import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../shared/model/product.model';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() products!: any | IProduct;
	@Input() loading!: boolean;

	productsList!: IProduct[];

	constructor(private store: Store) {}

	ngOnInit(): void {
		// eslint-disable-next-line no-console
		console.log('ok');

		// this.store.dispatch(UserActions.list.loadProductsInUserList());
		// this.store.pipe(select(getUserListLoadingSelector));
		// this.store
		// 	.pipe(
		// 		select(getUserListSelector),
		// 		map(products => {
		// 			this.productsList = products;
		// 		}),
		// 	)
		// 	.subscribe();
	}
}
