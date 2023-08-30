import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../shared/model/product.model';
import { Store, select } from '@ngrx/store';
import { UserActions } from '../../../../core/state/user/actions/user-index.actions';
import {
	getUserListLoadingSelector,
	getUserListSelector,
} from '../../../../core/state/user/selectors/user-list.selectors';
import { map } from 'rxjs';

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
		this.store.dispatch(UserActions.list.loadProductsInUserList());

		this.store.pipe(select(getUserListLoadingSelector));

		this.store
			.pipe(
				select(getUserListSelector),
				map(products => {
					this.productsList = products;
				}),
			)
			.subscribe();
	}
}
