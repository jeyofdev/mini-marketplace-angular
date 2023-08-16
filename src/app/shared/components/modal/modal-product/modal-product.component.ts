import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { map, mergeMap, tap } from 'rxjs';
import { CategoryService } from '../../../service/category.service';
import {
	IColorCheckbox,
	ISelectItem,
} from '../../../interfaces/input.interface';
import { ICategory } from '../../../model/category.model';
import { IProduct } from '../../../model/product.model';
import { ProductService } from '../../../service/product.service';
import { addProductValidationMessages } from '../../../validations/messages.validation';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../service/data.service';
import { FillFormWithCurrentProductFnType } from '../../../types/index.type';
import { ProductColorEnum } from 'src/app/shared/enum/product.enum';

@Component({
	selector: 'app-modal-product',
	templateUrl: './modal-product.component.html',
	styleUrls: ['./modal-product.component.scss'],
	providers: [MessageService],
})
export class ModalProductComponent implements OnInit {
	@Input() visible!: boolean;
	@Input() position!: 'left' | 'right' | 'top' | 'bottom';
	@Input() title!: string;

	@Output() visibleChange = new EventEmitter<boolean>();
	@Output() fillFormProduct =
		new EventEmitter<FillFormWithCurrentProductFnType>();

	mainForm!: FormGroup;
	colorsForm!: FormGroup;
	nameForm!: FormGroup;
	detailsForm!: FormGroup;
	infosForm!: FormGroup;

	brandNameCtrl!: FormControl<string | null>;
	modelNameCtrl!: FormControl<string | null>;
	categoryCtrl!: FormControl<string | null>;
	sizeCtrl!: FormControl<string | null>;
	quantityCtrl!: FormControl;
	priceCtrl!: FormControl;

	categories!: ISelectItem[];
	sizes!: ISelectItem[];
	colors!: IColorCheckbox[];

	submitBtnLabel!: string;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputsValidationMessages!: any;

	currentProduct!: IProduct;

	constructor(
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private productService: ProductService,
		private messageService: MessageService,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.categories = [];
		this.sizes = this.dataService.getAllSizes();
		this.colors = this.dataService.getAllColors();

		this.inputsValidationMessages = addProductValidationMessages;

		this.initCategories();
		this.initFormControls();
		this.initFormGroups();
		this.initMainForm();
		this.submitBtnLabel = 'Add product';

		this.fillFormProduct.emit(this.fillFormWithCurrentProduct);
	}

	onMainFormSubmit(): void {
		if (!this.currentProduct) {
			this.addProduct();
		} else {
			this.updateProduct();
		}
	}

	fillFormWithCurrentProduct = (product: IProduct) => {
		this.currentProduct = product;
		this.submitBtnLabel = 'Update product';

		this.patchValueForm();
	};

	onClose(arg: boolean): void {
		this.visible = arg;
		this.visibleChange.emit(arg);
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			name: this.nameForm,
			details: this.detailsForm,
			infos: this.infosForm,
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

		this.nameForm = this.formBuilder.group({
			brandName: this.brandNameCtrl,
			modelName: this.modelNameCtrl,
		});

		this.detailsForm = this.formBuilder.group({
			category: this.categoryCtrl,
			size: this.sizeCtrl,
		});

		this.infosForm = this.formBuilder.group({
			quantity: this.quantityCtrl,
			price: this.priceCtrl,
		});
	}

	private initFormControls(): void {
		this.brandNameCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(
				addProductValidationMessages.brandName.minlength.value,
			),
			Validators.maxLength(
				addProductValidationMessages.brandName.maxlength.value,
			),
		]);

		this.modelNameCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(
				addProductValidationMessages.modelName.minlength.value,
			),
			Validators.maxLength(
				addProductValidationMessages.modelName.maxlength.value,
			),
		]);

		this.categoryCtrl = this.formBuilder.control(null, Validators.required);
		this.sizeCtrl = this.formBuilder.control('', Validators.required);

		this.quantityCtrl = this.formBuilder.control('1');
		this.priceCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.min(addProductValidationMessages.price.min.value),
		]);
	}

	private patchValueForm(): void {
		this.nameForm.patchValue({
			brandName: this.currentProduct.brandName,
			modelName: this.currentProduct.modelName,
		});

		this.detailsForm.patchValue({
			category: this.currentProduct.category,
			size: this.currentProduct.size,
		});

		this.infosForm.patchValue({
			quantity: this.currentProduct.quantity,
			price: this.currentProduct.price,
		});

		this.colorsForm.patchValue({
			blue: this.currentProduct.color.includes(ProductColorEnum.BLUE),
			red: this.currentProduct.color.includes(ProductColorEnum.RED),
			green: this.currentProduct.color.includes(ProductColorEnum.GREEN),
			yellow: this.currentProduct.color.includes(ProductColorEnum.YELLOW),
			purple: this.currentProduct.color.includes(ProductColorEnum.PURPLE),
		});
	}

	private addProduct(): void {
		const newProduct = this.formatProductDatas();

		this.productService
			.add(newProduct)
			.then(() => {
				this.toastSuccess(
					`The product '${this.mainForm.value.name.brandName}' has been successfully added.`,
				);
			})
			.catch(err => this.toastError(err.message));
	}

	private updateProduct(): void {
		const updateProduct = this.formatProductDatas();

		this.productService
			.updateById(this.currentProduct.id as string, updateProduct)
			.then(() => {
				this.toastSuccess(
					`The product '${this.mainForm.value.name.brandName}' has been successfully updated.`,
				);
			})
			.catch(err => this.toastError(err.message));
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

	private toastSuccess(message: string): void {
		this.messageService.add({
			severity: 'success',
			summary: message,
		});

		this.mainForm.reset();
		this.onClose(false);
	}

	private toastError(message: string): void {
		this.messageService.add({
			severity: 'error',
			summary: message,
		});
	}

	private formatProductDatas(): IProduct {
		return {
			...this.mainForm.value.name,
			...this.mainForm.value.infos,
			...this.mainForm.value.details,
			// category: this.mainForm.value.details.category.value,
			// size: this.mainForm.value.details.size.value,
			color: Object.entries(this.mainForm.value.colors)
				.filter(color => color[1])
				.map(color => color[0]),
		};
	}
}
