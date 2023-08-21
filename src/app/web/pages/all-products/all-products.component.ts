import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IProduct } from 'src/app/shared/model/product.model';
import { WebActions } from '../../state/actions/web-index.actions';
import {
	getWebProductsLoadingSelector,
	getWebProductsSelector,
} from '../../state/selectors/web-product.selectors';
import { DataService } from '../../../shared/service/data.service';
import {
	IColorCheckbox,
	ISelectItem,
} from 'src/app/shared/interfaces/input.interface';

@Component({
	selector: 'app-all-products',
	templateUrl: './all-products.component.html',
	styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
	loading$!: Observable<boolean>;
	products!: IProduct[];
	filteredProducts!: IProduct[];
	sizes!: ISelectItem[];
	colors!: IColorCheckbox[];
	filters!: { sizes: string[] };

	constructor(
		private store: Store,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.sizes = this.dataService.getAllSizes();
		this.colors = this.dataService.getAllColors();
		this.filters = {
			sizes: [],
		};

		this.store.dispatch(WebActions.products.loadProducts());
		this.loading$ = this.store.pipe(select(getWebProductsLoadingSelector));

		this.store
			.pipe(
				select(getWebProductsSelector),
				map(products => {
					this.products = products;
					this.filteredProducts = this.getFilteredProducts(products);
				}),
			)
			.subscribe();
	}

	sizeSelected(currentSize: ISelectItem): void {
		if (!this.filters.sizes.includes(currentSize.value)) {
			this.filters.sizes.push(currentSize.value);
			this.filteredProducts = this.getFilteredProducts(this.products);
		} else {
			this.filters.sizes = this.filters.sizes.filter(
				(size: string) => size !== currentSize.value,
			);
			this.filteredProducts = this.getFilteredProducts(this.products);
		}
	}

	getOutline(size: ISelectItem) {
		return !this.filters.sizes.includes(size.value);
	}

	getFilteredProducts(products: IProduct[]) {
		if (this.filters.sizes.length > 0) {
			return products.filter(product =>
				this.filters.sizes.includes(product.size.value),
			);
		}

		return products;
	}
}
