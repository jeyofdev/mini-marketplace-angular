import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IProduct } from '@shared/model/product.model';
import { WebActions } from '@core/state/web/actions/web-index.actions';
import { DataService } from '@shared/service/data.service';
import {
	ChoiceItemType,
	ColorItemType,
} from '@shared/interfaces/input.interface';
import {
	getWebProductsActiveLoadingSelector,
	getWebProductsActiveSelector,
} from '@core/state/web/selectors/web-product.selectors';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '@shared/service/category.service';
import { ICategory } from '@shared/model/category.model';

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
	categories!: ChoiceItemType[];
	filters!: { sizes: string[]; colors: string[]; categories: string[] };

	filterForm!: FormGroup;
	sizesForm!: FormGroup;
	colorsForm!: FormGroup;
	categoriesForm!: FormGroup;

	constructor(
		private store: Store,
		private dataService: DataService,
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
	) {}

	ngOnInit(): void {
		this.categories = [];
		this.sizes = this.dataService.getAllSizes();
		this.colors = this.dataService.getAllColors();
		this.filters = {
			sizes: [],
			colors: [],
			categories: [],
		};

		this.initCategories();
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

	sizeSelected(currentSize: string): void {
		if (!this.filters.sizes.includes(currentSize)) {
			this.filters.sizes = [...this.filters.sizes, currentSize];
		} else {
			this.filters.sizes = this.filters.sizes.filter((size: string) => {
				return size !== currentSize;
			});
		}

		this.filteredProducts = this.getFilteredProducts();
	}

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

	categoriesSelected(currentCategory: string): void {
		if (!this.filters.categories.includes(currentCategory)) {
			this.filters.categories.push(currentCategory);
		} else {
			this.filters.categories = this.filters.categories.filter(
				(size: string) => {
					return size !== currentCategory;
				},
			);
		}

		this.filteredProducts = this.getFilteredProducts();
	}

	getOutline(size: ChoiceItemType) {
		return !this.filters.sizes.includes(size.value);
	}

	private getFilteredProducts() {
		let result: IProduct[] = this.products;

		if (this.filters.sizes.length > 0) {
			result = result.filter((product: IProduct) => {
				if (Array.isArray(product.size)) {
					const productSize = product.size.map(p => p.value);

					return (
						productSize.some(s => this.filters.sizes.indexOf(s) >= 0) && product
					);
				}
				return;
			});
		}

		if (this.filters.colors.length > 0) {
			result = result.filter(product =>
				product.color.some(item => this.filters.colors.includes(item)),
			);
		}

		if (this.filters.categories.length > 0) {
			result = result.filter((product: IProduct) => {
				if (Array.isArray(product.category)) {
					const productCategory = product.category.map(p => p.value);

					return (
						productCategory.some(
							c => this.filters.categories.indexOf(c) >= 0,
						) && product
					);
				}
				return;
			});
		}

		return result;
	}

	private initFilterForm(): void {
		this.filterForm = this.formBuilder.group({
			colors: this.colorsForm,
			sizes: this.sizesForm,
			categories: this.categoriesForm,
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

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const sizeGroup: any = {};
		this.sizes.forEach(size => {
			sizeGroup[size.name] = [false];
		});

		this.sizesForm = this.formBuilder.group(sizeGroup);

		this.categoriesForm = this.formBuilder.group({
			pull: [false],
			pantalon: [false],
		});
	}

	private initCategories(): void {
		this.categoryService
			.getAll()
			.pipe(
				map((categories: ICategory[]) => {
					this.categories = categories
						.filter(category => category.status === 'active')
						.map(c => ({
							name: c.name.split(' ').join('-').toLowerCase(),
							label: c.name,
							value: c.name.split(' ').join('-').toLowerCase(),
						}));
				}),
			)
			.subscribe();
	}
}
