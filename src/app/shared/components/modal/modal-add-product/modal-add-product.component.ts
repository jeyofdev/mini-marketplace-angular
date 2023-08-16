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

@Component({
	selector: 'app-modal-add-product',
	templateUrl: './modal-add-product.component.html',
	styleUrls: ['./modal-add-product.component.scss'],
	providers: [MessageService],
})
export class ModalAddProductComponent implements OnInit {
	@Input() visible!: boolean;
	@Input() position!: 'left' | 'right' | 'top' | 'bottom';
	@Output() visibleChange = new EventEmitter<boolean>();

	mainForm!: FormGroup;
	colorsForm!: FormGroup;
	nameForm!: FormGroup;
	detailsForm!: FormGroup;
	infosForm!: FormGroup;

	brandNameCtrl!: FormControl<string | null>;
	modelNameCtrl!: FormControl<string | null>;
	categoryCtrl!: FormControl<string | null>;
	sizeCtrl!: FormControl<string | null>;
	quantityCtrl!: FormControl<string | null>;
	priceCtrl!: FormControl<string | null>;

	categories!: ISelectItem[];
	sizes!: ISelectItem[];
	colors!: IColorCheckbox[];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputsValidationMessages!: any;

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
	}

	onMainFormSubmit(): void {
		this.addProduct();
	}

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

		this.categoryCtrl = this.formBuilder.control('', Validators.required);
		this.sizeCtrl = this.formBuilder.control('', Validators.required);

		this.quantityCtrl = this.formBuilder.control('1');
		this.priceCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.min(addProductValidationMessages.price.min.value),
		]);
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
				this.onClose(false);
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
}
