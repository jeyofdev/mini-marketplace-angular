import { DataService } from '../../../../shared/service/data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { addCategoryValidationMessages } from '../../../validations/messages.validation';
import { MessageService } from 'primeng/api';
import { ICategory } from '../../../../shared/model/category.model';
import { FillFormWithCurrentCategoryFnType } from '../../../../shared/types/index.type';
import { IRadioButtonItem } from '../../../../shared/interfaces/input.interface';
import { Subscription } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { DashboardActions } from '../../../state/actions/dashboard-index.actions';
import { addSubscriptionAndShowToast } from 'src/app/dashboard/utils/components.util';

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

	mainForm!: FormGroup;
	nameCtrl!: FormControl<string | null>;
	descriptionCtrl!: FormControl<string | null>;
	statusCtrl!: FormControl<string | null>;

	private subscription: Subscription = new Subscription();

	submitBtnLabel!: string;

	status!: IRadioButtonItem[];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addCategoryValidationMessages!: any;

	currentCategory!: ICategory;

	constructor(
		private formBuilder: FormBuilder,
		private messageService: MessageService,
		private dataService: DataService,
		private store: Store,
		private actionsSubject: ActionsSubject,
	) {}

	ngOnInit(): void {
		this.status = this.dataService.getAllStatus();

		this.initFormControls();
		this.initMainForm();
		this.addCategoryValidationMessages = addCategoryValidationMessages;
		this.submitBtnLabel = 'Add category';

		this.fillFormCategory.emit(this.fillFormWithCurrentCategory);
	}

	onMainFormSubmit(): void {
		if (!this.currentCategory) {
			this.addCategory();
		} else {
			this.updateCategory();
		}
	}

	fillFormWithCurrentCategory = (category: ICategory) => {
		this.currentCategory = category;
		this.submitBtnLabel = 'Update category';

		this.mainForm.patchValue({
			name: this.currentCategory.name,
			description: this.currentCategory.description,
			status: this.currentCategory.status,
		});
	};

	onClose = (arg: boolean): void => {
		this.visible = arg;
		this.visibleChange.emit(arg);
	};

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			name: this.nameCtrl,
			description: this.descriptionCtrl,
			status: this.statusCtrl,
		});
	}

	private initFormControls(): void {
		this.nameCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(addCategoryValidationMessages.name.minlength.value),
			Validators.maxLength(addCategoryValidationMessages.name.maxlength.value),
		]);

		this.descriptionCtrl = this.formBuilder.control('', [
			Validators.minLength(
				addCategoryValidationMessages.description.minlength.value,
			),
		]);

		this.statusCtrl = this.formBuilder.control('', [Validators.required]);
	}

	private addCategory(): void {
		this.store.dispatch(
			DashboardActions.categories.addCategory({
				payload: { data: this.formatCategoryDatas() },
			}),
		);

		this.addSubscription(
			DashboardActions.categories.addCategorySuccess,
			`The category '${this.mainForm.value.name}' has been successfully added.`,
		);
	}

	private updateCategory(): void {
		this.store.dispatch(
			DashboardActions.categories.updateCategory({
				payload: {
					id: this.currentCategory.id as string,
					data: this.formatCategoryDatas(),
				},
			}),
		);

		this.addSubscription(
			DashboardActions.categories.updateCategorySuccess,
			`The category '${this.mainForm.value.name}' has been successfully updated.`,
		);
	}

	private formatCategoryDatas(): ICategory {
		return {
			name:
				this.mainForm.value.name.slice(0, 1).toUpperCase() +
				this.mainForm.value.name.slice(1),
			description: this.mainForm.value.description,
			status: this.mainForm.value.status,
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
