import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from '../modal-add-category/modal-add-category.component';
import { IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, mergeMap, tap } from 'rxjs';
import { CategoryService } from '../../../service/category.service';
import { ISelectItem } from '../../../interfaces/input.interface';
import { ICategory } from '../../../model/category.model';
import { ProductSizeEnum } from 'src/app/shared/enum/product.enum';

@Component({
	selector: 'app-modal-add-products',
	templateUrl: './modal-add-products.component.html',
	styleUrls: ['./modal-add-products.component.scss'],
})
export class ModalAddProductsComponent implements OnInit {
	iconClose!: IconDefinition;
	mainForm!: FormGroup;
	colorsForm!: FormGroup;

	categories!: ISelectItem[];
	sizes!: ISelectItem[];
	colors!: { color: string; label: string; name: string }[];

	//
	value = 20;
	//

	constructor(
		public dialogRef: MatDialogRef<ModalAddCategoryComponent>,
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
	) {}

	ngOnInit(): void {
		this.iconClose = faXmark;
		this.categories = [];

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

		this.sizes = [
			{ value: ProductSizeEnum.M, label: ProductSizeEnum.M },
			{ value: ProductSizeEnum.L, label: ProductSizeEnum.L },
			{ value: ProductSizeEnum.S, label: ProductSizeEnum.S },
			{ value: ProductSizeEnum.XL, label: ProductSizeEnum.XL },
		];

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

		this.initFormControls();
		this.initMainForm();
	}

	onMainFormSubmit(): void {
		// eslint-disable-next-line no-console
		console.log(this.mainForm.value);
	}

	onClose(): void {
		this.dialogRef.close();
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			brandName: [''],
			modelName: [''],
			category: [''],
			size: [''],
			quantity: [''],
			price: [''],
			colorsForm: this.colorsForm,
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
	}
}
