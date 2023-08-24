import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Subscription, map, mergeMap, tap } from 'rxjs';
import { CategoryService } from '../../../../shared/service/category.service';
import {
	IColorCheckbox,
	IRadioButtonItem,
	ISelectItem,
} from '../../../../shared/interfaces/input.interface';
import { ICategory } from '../../../../shared/model/category.model';
import { IProduct } from '../../../../shared/model/product.model';
import { ProductService } from '../../../../shared/service/product.service';
import { addProductValidationMessages } from '../../../validations/messages.validation';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../../shared/service/data.service';
import { FillFormWithCurrentProductFnType } from '../../../../shared/types/index.type';
import { ProductColorEnum } from '../../../../shared/enum/product.enum';
import { ActionsSubject, Store } from '@ngrx/store';
import { DashboardActions } from '../../../state/actions/dashboard-index.actions';
import { addSubscriptionAndShowToast } from '../../../../dashboard/utils/components.util';

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
	statusCtrl!: FormControl<string | null>;

	categories!: ISelectItem[];
	sizes!: ISelectItem[];
	colors!: IColorCheckbox[];
	status!: IRadioButtonItem[];

	submitBtnLabel!: string;

	private subscription: Subscription = new Subscription();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputsValidationMessages!: any;

	currentProduct!: IProduct;

	constructor(
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private productService: ProductService,
		private messageService: MessageService,
		private dataService: DataService,
		private store: Store,
		private actionsSubject: ActionsSubject,
	) {}

	ngOnInit(): void {
		this.categories = [];
		this.sizes = this.dataService.getAllSizes();
		this.colors = this.dataService.getAllColors();
		this.status = this.dataService.getAllStatus();

		this.inputsValidationMessages = addProductValidationMessages;

		this.initCategories();
		this.initFormControls();
		this.initFormGroups();
		this.initMainForm();
		this.submitBtnLabel = 'Add product';

		this.fillFormProduct.emit(this.fillFormWithCurrentProduct);
	}

	onMainFormSubmit(): void {
		// console.log(this.mainForm.value.infos);

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

	onClose = (arg: boolean): void => {
		this.visible = arg;
		this.visibleChange.emit(arg);
	};

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
			status: this.currentProduct.status,
		});

		this.colorsForm.patchValue({
			blue: this.currentProduct.color.includes(ProductColorEnum.BLUE),
			red: this.currentProduct.color.includes(ProductColorEnum.RED),
			green: this.currentProduct.color.includes(ProductColorEnum.GREEN),
			yellow: this.currentProduct.color.includes(ProductColorEnum.YELLOW),
			purple: this.currentProduct.color.includes(ProductColorEnum.PURPLE),
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

	private addProduct(): void {
		this.store.dispatch(
			DashboardActions.products.addProduct({
				payload: { data: this.formatProductDatas() },
			}),
		);

		this.addSubscription(
			DashboardActions.products.addProductSuccess,
			`The product '${this.mainForm.value.name.brandName}' has been successfully added.`,
		);
	}

	private updateProduct(): void {
		this.store.dispatch(
			DashboardActions.products.updateProduct({
				payload: {
					id: this.currentProduct.id as string,
					data: this.formatProductDatas(),
				},
			}),
		);

		this.addSubscription(
			DashboardActions.products.updateProductSuccess,
			`The product '${this.mainForm.value.name.brandName}' has been successfully updated.`,
		);
	}

	private formatProductDatas(): IProduct {
		return {
			...this.mainForm.value.name,
			...this.mainForm.value.infos,
			...this.mainForm.value.details,
			color: Object.entries(this.mainForm.value.colors)
				.filter(color => color[1])
				.map(color => color[0]),
		};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private addSubscription(action: any, message: string): void {
		addSubscriptionAndShowToast(
			this.subscription,
			this.actionsSubject,
			action,
			this.messageService,
			message,
			this.mainForm,
			this.onClose,
		);
	}
}
