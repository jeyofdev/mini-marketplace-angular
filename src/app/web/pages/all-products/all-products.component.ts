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
import { ISelectItem } from 'src/app/shared/interfaces/input.interface';

@Component({
	selector: 'app-all-products',
	templateUrl: './all-products.component.html',
	styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
	loading$!: Observable<boolean>;
	products!: IProduct[];
	sizes!: ISelectItem[];
	filters!: { sizes: string[] };

	constructor(
		private store: Store,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.sizes = this.dataService.getAllSizes();
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
				}),
			)
			.subscribe();
	}

	sizeSelected(currentSize: ISelectItem): void {
		if (!this.filters.sizes.includes(currentSize.value)) {
			this.filters.sizes.push(currentSize.value);
		} else {
			this.filters.sizes = this.filters.sizes.filter(
				(size: string) => size !== currentSize.value,
			);
		}
	}

	getOutline(size: ISelectItem) {
		return !this.filters.sizes.includes(size.value);
	}
}
