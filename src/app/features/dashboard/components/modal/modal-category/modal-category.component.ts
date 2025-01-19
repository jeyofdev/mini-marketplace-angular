import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ICategory, ISaveCategory } from '@shared/model/category.model';
import { FillFormWithCurrentCategoryFnType } from '@shared/types/index.type';
import { Subscription } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { DashboardActions } from '@dashboard/state/actions/dashboard-index.actions';
import { addSubscriptionAndShowToast } from '@shared/utils/toast';

@Component({
	selector: 'app-modal-category',
	templateUrl: './modal-category.component.html',
	styleUrls: ['./modal-category.component.scss'],
	providers: [MessageService],
})
export class ModalCategoryComponent implements OnInit {
	@Input() visible!: boolean;
	@Input() position!: 'left' | 'right' | 'top' | 'bottom';
	@Input() title!: string;

	@Output() visibleChange = new EventEmitter<boolean>();
	@Output() fillFormCategory =
		new EventEmitter<FillFormWithCurrentCategoryFnType>();

	private subscription: Subscription = new Subscription();

	currentCategory!: ICategory;
	submitBtnLabel!: string;

	constructor(
		private messageService: MessageService,
		private store: Store,
		private actionsSubject: ActionsSubject,
	) {}

	ngOnInit(): void {
		this.submitBtnLabel = 'Add category';
		this.fillFormCategory.emit(this.fillFormWithCurrentCategory);
	}

	fillFormWithCurrentCategory = (category: ICategory) => {
		this.currentCategory = category;
		this.submitBtnLabel = 'Update category';
	};

	onClose = (arg: boolean): void => {
		this.visible = arg;
		this.visibleChange.emit(arg);
	};

	submitCategory(form: FormGroup): void {
		if (!this.currentCategory) {
			this.addCategory(form);
		} else {
			this.updateCategory(form);
		}
	}

	private addCategory(form: FormGroup): void {
		this.store.dispatch(
			DashboardActions.categories.addCategory({
				payload: { data: this.formatCategoryDatas(form) },
			}),
		);
		this.addSubscription(
			DashboardActions.categories.addCategorySuccess,
			`The category '${form.value.name}' has been successfully added.`,
			form,
		);
	}

	private updateCategory(form: FormGroup): void {
		this.store.dispatch(
			DashboardActions.categories.updateCategory({
				payload: {
					id: this.currentCategory.id as string,
					data: this.formatCategoryDatas(form),
				},
			}),
		);

		this.addSubscription(
			DashboardActions.categories.updateCategorySuccess,
			`The category '${form.value.name}' has been successfully updated.`,
			form,
		);
	}

	private formatCategoryDatas(form: FormGroup): ISaveCategory {
		return {
			name:
				form.value.name.slice(0, 1).toUpperCase() + form.value.name.slice(1),
			description: form.value.description,
			status: form.value.status,
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
