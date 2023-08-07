import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from '../modal-add-category/modal-add-category.component';
import { IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, mergeMap, tap } from 'rxjs';
import { CategoryService } from '../../../service/category.service';
import {
	IColorCheckbox,
	ISelectItem,
} from '../../../interfaces/input.interface';
import { ICategory } from '../../../model/category.model';
import { ProductSizeEnum } from '../../../enum/product.enum';
import { IProduct } from '../../../model/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../service/product.service';
import { openSnackBar } from '../../../utils/form.utils';

@Component({
	selector: 'app-modal-add-products',
	templateUrl: './modal-add-products.component.html',
	styleUrls: ['./modal-add-products.component.scss'],
})
export class ModalAddProductsComponent implements OnInit {
	iconClose!: IconDefinition;

	mainForm!: FormGroup;
	colorsForm!: FormGroup;
	nameForm!: FormGroup;
	detailsForm!: FormGroup;
	infosForm!: FormGroup;

	categories!: ISelectItem[];
	sizes!: ISelectItem[];
	colors!: IColorCheckbox[];

	constructor(
		public dialogRef: MatDialogRef<ModalAddCategoryComponent>,
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private productService: ProductService,
		private _snackBar: MatSnackBar,
	) {}

	ngOnInit(): void {
		this.iconClose = faXmark;
		this.categories = [];

		this.initCategories();
		this.initSizes();
		this.initColors();

		this.initFormControls();
		this.initMainForm();
	}

	onMainFormSubmit(): void {
		this.addProduct();
	}

	onClose(): void {
		this.dialogRef.close();
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			name: this.nameForm,
			details: this.detailsForm,
			infos: this.infosForm,
			colors: this.colorsForm,
		});
	}

	private initFormControls(): void {
		this.colorsForm = this.formBuilder.group({
			blue: [false],
			red: [false],
			green: [false],
			yellow: [false],
			purple: [false],
		});

		this.nameForm = this.formBuilder.group({
			brandName: [''],
			modelName: [''],
		});

		this.detailsForm = this.formBuilder.group({
			category: [''],
			size: [''],
		});

		this.infosForm = this.formBuilder.group({
			quantity: [''],
			price: [''],
		});
	}

	private addProduct(): void {
		const newProduct: IProduct = {
			...this.mainForm.value.name,
			...this.mainForm.value.details,
			...this.mainForm.value.infos,
			color: Object.entries(this.mainForm.value.colors)
				.filter(color => color[1])
				.map(color => color[0]),
		};

		this.productService
			.add(newProduct)
			.then(() => {
				openSnackBar(
					this._snackBar,
					`The product '${newProduct.brandName}' has been added.`,
					'successfull',
				);

				this.mainForm.reset();
			})
			.catch(err => {
				openSnackBar(this._snackBar, err.message, 'fail');
			});
	}

	private initCategories(): void {
		this.categoryService
			.getAll()
			.pipe(
				mergeMap((categories: ICategory[]) => categories),
				map((category: ICategory) => ({
					label: category.name,
					value: category.name.split(' ').join('-').toLowerCase(),
				})),
				tap(result => this.categories.push(result)),
			)
			.subscribe();
	}

	private initSizes(): void {
		this.sizes = [
			{ value: ProductSizeEnum.M, label: ProductSizeEnum.M },
			{ value: ProductSizeEnum.L, label: ProductSizeEnum.L },
			{ value: ProductSizeEnum.S, label: ProductSizeEnum.S },
			{ value: ProductSizeEnum.XL, label: ProductSizeEnum.XL },
		];
	}

	private initColors(): void {
		this.colors = [
			{
				color: '#f87575',
				label: 'red',
				name: 'red',
			},
			{
				color: '#5c95ff',
				label: 'blue',
				name: 'blue',
			},
			{
				color: '#2EC12B',
				label: 'green',
				name: 'green',
			},
			{
				color: '#FFFF5C',
				label: 'yellow',
				name: 'yellow',
			},
			{
				color: '#952265',
				label: 'purple',
				name: 'purple',
			},
		];
	}
}
