import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from '@shared/model/product.model';
import { MessageService } from 'primeng/api';
import { FillFormWithCurrentProductFnType } from '@shared/types/index.type';
import { ActionsSubject, Store } from '@ngrx/store';
import { DashboardActions } from '@dashboard/state/actions/dashboard-index.actions';
import { addSubscriptionAndShowToast } from '@shared/utils/toast';

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

	currentProduct!: IProduct;
	submitBtnLabel!: string;

	private subscription: Subscription = new Subscription();

	constructor(
		private messageService: MessageService,
		private store: Store,
		private actionsSubject: ActionsSubject,
	) {}

	ngOnInit(): void {
		this.submitBtnLabel = 'Add product';
		this.fillFormProduct.emit(this.fillFormWithCurrentProduct);
	}

	fillFormWithCurrentProduct = (product: IProduct) => {
		this.currentProduct = product;
		this.submitBtnLabel = 'Update product';
	};

	onClose = (arg: boolean): void => {
		this.visible = arg;
		this.visibleChange.emit(arg);
	};

	submitProduct(form: FormGroup): void {
		if (!this.currentProduct) {
			this.addProduct(form);
		} else {
			this.updateProduct(form);
		}
	}

	private addProduct(form: FormGroup): void {
		this.store.dispatch(
			DashboardActions.products.addProduct({
				payload: { data: this.formatProductDatas(form) },
			}),
		);

		this.addSubscription(
			DashboardActions.products.addProductSuccess,
			`The product '${form.value.name.brandName}' has been successfully added.`,
			form,
		);
	}

	private updateProduct(form: FormGroup): void {
		this.store.dispatch(
			DashboardActions.products.updateProduct({
				payload: {
					id: this.currentProduct.id as string,
					data: this.formatProductDatas(form),
				},
			}),
		);

		this.addSubscription(
			DashboardActions.products.updateProductSuccess,
			`The product '${form.value.name.brandName}' has been successfully updated.`,
			form,
		);
	}

	private formatProductDatas(form: FormGroup): IProduct {
		return {
			...form.value.name,
			...form.value.infos,
			...form.value.details,
			color: Object.entries(form.value.colors)
				.filter(color => color[1])
				.map(color => color[0]),
			options: Object.entries(form.value.options)
				.filter(option => option[1])
				.map(option => option[0]),
		};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private addSubscription(action: any, message: string, form: FormGroup): void {
		addSubscriptionAndShowToast(
			this.subscription,
			this.actionsSubject,
			action,
			this.messageService,
			message,
			form,
			this.onClose,
		);
	}
}
