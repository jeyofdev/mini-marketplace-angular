import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IProduct } from 'src/app/shared/model/product.model';
import { WebActions } from '../../../core/state/web/actions/web-index.actions';
import { DataService } from '../../../shared/service/data.service';
import {
	ChoiceItemType,
	ColorItemType,
} from '../../../shared/interfaces/input.interface';
import {
	getWebProductsActiveLoadingSelector,
	getWebProductsActiveSelector,
} from '../../../core/state/web/selectors/web-product.selectors';

@Component({
	selector: 'app-all-products',
	templateUrl: './all-products.component.html',
	styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
	loading$!: Observable<boolean>;
	products!: IProduct[];
	filteredProducts!: IProduct[];
	sizes!: ChoiceItemType[];
	colors!: ColorItemType[];
	filters!: { sizes: string[]; colors: string[] };

	constructor(
		private store: Store,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.sizes = this.dataService.getAllSizes();
		this.colors = this.dataService.getAllColors();
		this.filters = {
			sizes: [],
			colors: [],
		};

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

	sizeSelected(currentSize: ChoiceItemType): void {
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

	colorSelected(currentColor: ColorItemType): void {
		if (!this.filters.colors.includes(currentColor.name as string)) {
			this.filters.colors.push(currentColor.name as string);
			this.filteredProducts = this.getFilteredProducts(this.products);
		} else {
			this.filters.colors = this.filters.colors.filter(
				(color: string) => color !== currentColor.name,
			);
			this.filteredProducts = this.getFilteredProducts(this.products);
		}
	}

	getOutline(size: ChoiceItemType) {
		return !this.filters.sizes.includes(size.value);
	}

	getFilteredProducts(products: IProduct[]) {
		if (this.filters.sizes.length > 0) {
			return products.filter(product =>
				this.filters.sizes.includes(product.size.value),
			);
		}

		if (this.filters.colors.length > 0) {
			return this.products.filter(product => {
				return product.color.some(item => this.filters.colors.includes(item));
			});
		}

		return products;
	}
}
