import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { WebActions } from '../../state/actions/web-index.actions';
import { IProduct } from '../../../shared/model/product.model';
import { Observable, Subscription, map } from 'rxjs';
import {
	getWebCurrentProductLoadingSelector,
	getWebCurrentProductSelector,
} from '../../state/selectors/web-product.selectors';
import { IImage } from '../../../shared/model/image.model';
import { BreakpointEnum } from '../../../shared/enum/breakpoint.enum';
import { BreakpointService } from '../../../shared/service/breakpoint.service';
import { DataService } from '../../../shared/service/data.service';
import {
	ChoiceItemType,
	ColorItemType,
} from '../../../shared/interfaces/input.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { addSubscriptionAndShowToast } from '../../../shared/utils/toast';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	providers: [MessageService],
})
export class ProductComponent implements OnInit {
	currentProduct!: IProduct;
	loading$!: Observable<boolean>;
	image!: IImage;

	windowSize!: number;
	breakpoint!: BreakpointEnum;
	currentBreakpoint!: string;
	containerMaxHeight!: string;

	rating = 3.5;
	messages = [];

	sizes!: ChoiceItemType[];
	colors!: ColorItemType[];
	price!: string;

	mainForm!: FormGroup;
	sizeCtrl!: FormControl<string | null>;
	colorCtrl!: FormControl<string | null>;

	private subscription: Subscription = new Subscription();

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store,
		private breakpointService: BreakpointService,
		private dataService: DataService,
		private formBuilder: FormBuilder,
		private actionsSubject: ActionsSubject,
		private messageService: MessageService,
	) {}

	ngOnInit(): void {
		const { productId } = this.activatedRoute.snapshot.params;

		this.store.dispatch(
			WebActions.products.loadProduct({ payload: { id: productId } }),
		);
		this.loading$ = this.store.pipe(
			select(getWebCurrentProductLoadingSelector),
		);

		this.store
			.pipe(
				select(getWebCurrentProductSelector),
				map(product => {
					this.currentProduct = product as IProduct;
				}),
			)
			.subscribe();

		this.containerMaxHeight = '740px';
		this.initImage();

		this.sizes = this.dataService.getAllSizes();
		this.colors = this.dataService.getAllColors();
		this.price = '25';

		this.initFormControls();
		this.initMainForm();
	}

	onMainFormSubmit(): void {
		this.addCurrentProductToUserCart();
	}

	minValueByBreakpoint(Breakpoint: BreakpointEnum | string) {
		return this.breakpointService.getMinValueByBreakpoint(Breakpoint);
	}

	getMaxHeightContainer(): string {
		if (this.windowSize >= this.minValueByBreakpoint('md')) {
			return this.containerMaxHeight;
		}

		return 'none';
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			size: this.sizeCtrl,
			color: this.colorCtrl,
		});
	}

	private initFormControls(): void {
		this.sizeCtrl = this.formBuilder.control('', []);
		this.colorCtrl = this.formBuilder.control('', []);
	}

	private initImage(): void {
		this.image = {
			src: 'assets/img/auth/login.jpg',
			alt: '',
			position: 'top',
		};
	}

	private addCurrentProductToUserCart(): void {
		this.store.dispatch(
			WebActions.cart.addProductToCart({
				payload: { data: this.formatProductDatas() },
			}),
		);

		this.addSubscription(
			WebActions.cart.addProductToCartSuccess,
			`The article '${this.currentProduct.brandName}' has been successfully added to the cart.`,
		);
	}

	private formatProductDatas(): Partial<IProduct> {
		return {
			brandName: this.currentProduct.brandName,
			modelName: this.currentProduct.modelName,
			price: this.currentProduct.price,
			quantity: 1,
			...this.mainForm.value,
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
		);
	}
}
