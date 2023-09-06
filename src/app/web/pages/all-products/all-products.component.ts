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
import { FormBuilder, FormGroup } from '@angular/forms';

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

	filterForm!: FormGroup;
	colorsForm!: FormGroup;

	constructor(
		private store: Store,
		private dataService: DataService,
		private formBuilder: FormBuilder,
	) {}

	ngOnInit(): void {
		this.sizes = this.dataService.getAllSizes();
		this.colors = this.dataService.getAllColors();
		this.filters = {
			sizes: [],
			colors: [],
		};

		this.initFormGroups();
		this.initFilterForm();

		this.store.dispatch(WebActions.products.loadProductsActive());
		this.loading$ = this.store.pipe(
			select(getWebProductsActiveLoadingSelector),
		);

		this.store
			.pipe(
				select(getWebProductsActiveSelector),
				map(products => {
					this.products = products;
					this.filteredProducts = this.getFilteredProducts();
				}),
			)
			.subscribe();
	}

	// sizeSelected(currentSize: ChoiceItemType): void {
	// 	if (!this.filters.sizes.includes(currentSize.value)) {
	// 		this.filters.sizes.push(currentSize.value);
	// 		this.filteredProducts = this.getFilteredProducts(this.products);
	// 	} else {
	// 		this.filters.sizes = this.filters.sizes.filter(
	// 			(size: string) => size !== currentSize.value,
	// 		);
	// 		this.filteredProducts = this.getFilteredProducts(this.products);
	// 	}
	// }

	colorSelected(currentColor: string): void {
		if (!this.filters.colors.includes(currentColor)) {
			this.filters.colors = [...this.filters.colors, currentColor];
		} else {
			this.filters.colors = this.filters.colors.filter(
				(color: string) => color !== currentColor,
			);
		}

		this.filteredProducts = this.getFilteredProducts();
	}

	getOutline(size: ChoiceItemType) {
		return !this.filters.sizes.includes(size.value);
	}

	getFilteredProducts() {
		let result: IProduct[] = this.products;

		if (this.filters.colors.length > 0) {
			result = result.filter(product =>
				product.color.some(item => this.filters.colors.includes(item)),
			);
		}

		return result;
	}

	private initFilterForm(): void {
		this.filterForm = this.formBuilder.group({
			colors: this.colorsForm,
		});
	}

	private initFormGroups(): void {
		this.colorsForm = this.formBuilder.group({
			blue: [false],
			red: [false],
			green: [false],
			yellow: [false],
			purple: [false],
		});
	}
}
