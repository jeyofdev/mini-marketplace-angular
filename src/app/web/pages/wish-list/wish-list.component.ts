import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WebActions } from '../../../core/state/web/actions/web-index.actions';
import { IProduct } from '../../../shared/model/product.model';
import { Store, select } from '@ngrx/store';
import {
	getWebProductsActiveLoadingSelector,
	getWebProductsActiveSelector,
} from '../../../core/state/web/selectors/web-product.selectors';

@Component({
	selector: 'app-wish-list',
	templateUrl: './wish-list.component.html',
	styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
	loading$!: Observable<boolean>;
	products!: IProduct[];
	filteredProducts!: IProduct[];

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(WebActions.products.loadProductsActive());
		this.loading$ = this.store.pipe(
			select(getWebProductsActiveLoadingSelector),
		);

		this.store
			.pipe(
				select(getWebProductsActiveSelector),
				map(products => {
					this.products = products;
					this.filteredProducts = this.getFilteredProducts(products);
				}),
			)
			.subscribe();
	}

	getFilteredProducts(products: IProduct[]) {
		return products;
	}
}
