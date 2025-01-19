import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ChoiceItemType, ColorItemType } from '@shared/model/input.interface';
import { IProduct } from '@shared/model/product.model';
import { DataService } from '@shared/service/data.service';
import { filter, map, mergeMap, Observable, tap } from 'rxjs';
import { addProductValidationMessages } from '@dashboard/validations/messages.validation';
import { ProductColorEnum } from '@shared/enum/product.enum';
import { CategoryService } from '@shared/service/category.service';
import { ICategory } from '@shared/model/category.model';

@Component({
	selector: 'app-form-product',
	templateUrl: './form-product.component.html',
	styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
	@Input() submitBtnLabel!: string;
	@Input() currentProduct!: IProduct;

	@Output() submitProduct: EventEmitter<FormGroup> =
		new EventEmitter<FormGroup>();

	categories!: ChoiceItemType[];
	sizes$!: Observable<ChoiceItemType[]>;
	colors$!: Observable<ColorItemType[]>;
	status$!: Observable<ChoiceItemType[]>;
	options$!: Observable<ChoiceItemType[]>;

	mainForm!: FormGroup;
	colorsForm!: FormGroup;
	optionsForm!: FormGroup;
	nameForm!: FormGroup;
	detailsForm!: FormGroup;
	infosForm!: FormGroup;

	brandNameCtrl!: FormControl<string | null>;
	modelNameCtrl!: FormControl<string | null>;
	categoryCtrl!: FormControl<string | null>;
	sizeCtrl!: FormControl<string | null>;
	quantityCtrl!: FormControl;
	priceCtrl!: FormControl;
	statusCtrl!: FormControl<string | null>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputsValidationMessages!: any;

	constructor(
		private formBuilder: FormBuilder,
		private dataService: DataService,
		private categoryService: CategoryService,
	) {}

	ngOnInit(): void {
		this.categories = [];
		this.sizes$ = this.dataService.getAllSizes();
		this.colors$ = this.dataService.getAllColors();
		this.status$ = this.dataService.getAllStatus();
		this.options$ = this.dataService.getAllOptions();

		this.initCategories();

		this.initFormControls();
		this.initFormGroups();
		this.initMainForm();

		if (this.currentProduct) {
			this.pathFormValue();
		}

		this.inputsValidationMessages = addProductValidationMessages;
	}

	onMainFormSubmit(): void {
		if (this.mainForm.valid) {
			this.submitProduct.emit(this.mainForm);
		}
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			name: this.nameForm,
			details: this.detailsForm,
			infos: this.infosForm,
			colors: this.colorsForm,
			options: this.optionsForm,
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

		this.optionsForm = this.formBuilder.group({
			securePayment: [false],
			sizeAndFit: [false],
			freeShipping: [false],
			freeShippingAndReturns: [false],
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
			status: this.statusCtrl,
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

		this.statusCtrl = this.formBuilder.control('', [Validators.required]);
	}

	private pathFormValue(): void {
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
			status: this.currentProduct.status,
		});

		this.colorsForm.patchValue({
			blue: this.currentProduct.color.includes(ProductColorEnum.BLUE),
			red: this.currentProduct.color.includes(ProductColorEnum.RED),
			green: this.currentProduct.color.includes(ProductColorEnum.GREEN),
			yellow: this.currentProduct.color.includes(ProductColorEnum.YELLOW),
			purple: this.currentProduct.color.includes(ProductColorEnum.PURPLE),
		});

		this.optionsForm.patchValue({
			securePayment: this.currentProduct.options.includes('securePayment'),
			sizeAndFit: this.currentProduct.options.includes('sizeAndFit'),
			freeShipping: this.currentProduct.options.includes('freeShipping'),
			freeShippingAndReturns: this.currentProduct.options.includes(
				'freeShippingAndReturns',
			),
		});
	}

	private initCategories(): void {
		this.categoryService
			.getAll()
			.pipe(
				mergeMap((categories: ICategory[]) => categories),
				filter(category => category.status === 'active'),
				map((category: ICategory) => ({
					name: category.name,
					label: category.name,
					value: category.name.split(' ').join('-').toLowerCase(),
				})),
				tap(result => this.categories.push(result)),
			)
			.subscribe();
	}
}
