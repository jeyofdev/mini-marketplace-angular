import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from '../modal-add-category/modal-add-category.component';
import { IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, mergeMap, tap } from 'rxjs';
import { CategoryService } from '../../../service/category.service';
import {
	IColorCheckbox,
	ISelectItem,
} from '../../../interfaces/input.interface';
import { ICategory } from '../../../model/category.model';
import { ProductSizeEnum } from '../../../enum/product.enum';
import { IProduct } from '../../../model/product.model';
import { ProductService } from '../../../service/product.service';
import { addProductValidationMessages } from '../../../validations/messages.validation';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-add-products',
	templateUrl: './modal-add-products.component.html',
	styleUrls: ['./modal-add-products.component.scss'],
	providers: [MessageService],
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addProductValidationMessages!: any;

	constructor(
		public dialogRef: MatDialogRef<ModalAddCategoryComponent>,
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private productService: ProductService,
		private messageService: MessageService,
	) {}

	ngOnInit(): void {
		this.iconClose = faXmark;
		this.categories = [];

		this.initCategories();
		this.initSizes();
		this.initColors();

		this.addProductValidationMessages = addProductValidationMessages;

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
			brandName: [
				'',
				[
					Validators.required,
					Validators.minLength(
						addProductValidationMessages.brandName.minlength.value,
					),
					Validators.maxLength(
						addProductValidationMessages.brandName.maxlength.value,
					),
				],
			],
			modelName: [
				'',
				[
					Validators.required,
					Validators.minLength(
						addProductValidationMessages.modelName.minlength.value,
					),
					Validators.maxLength(
						addProductValidationMessages.modelName.maxlength.value,
					),
				],
			],
		});

		this.detailsForm = this.formBuilder.group({
			category: ['', Validators.required],
			size: ['', Validators.required],
		});

		this.infosForm = this.formBuilder.group({
			quantity: ['1'],
			price: ['', [Validators.required]],
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
				this.messageService.add({
					severity: 'success',
					summary: `The product '${newProduct.brandName}' has been added.`,
				});

				this.mainForm.reset();
			})
			.catch(err => {
				this.messageService.add({
					severity: 'error',
					summary: err.message,
				});
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
