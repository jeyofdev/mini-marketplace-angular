import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IProduct } from 'src/app/shared/model/product.model';
import { WebActions } from '../../state/actions/web-index.actions';
import {
	getWebProductsLoadingSelector,
	getWebProductsSelector,
} from '../../state/selectors/web-product.selectors';

@Component({
	selector: 'app-all-products',
	templateUrl: './all-products.component.html',
	styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
	loading$!: Observable<boolean>;
	products!: IProduct[];

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(WebActions.products.loadProducts());
		this.loading$ = this.store.pipe(select(getWebProductsLoadingSelector));

		this.store
			.pipe(
				select(getWebProductsSelector),
				map(products => {
					this.products = products;
				}),
			)
			.subscribe();
	}
}
