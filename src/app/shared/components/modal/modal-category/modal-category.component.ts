import { DataService } from './../../../service/data.service';
import { CategoryService } from '../../../service/category.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { addCategoryValidationMessages } from '../../../validations/messages.validation';
import { MessageService } from 'primeng/api';
import { ICategory } from '../../../model/category.model';
import { FillFormWithCurrentCategoryFnType } from '../../../types/index.type';
import { IRadioButtonItem } from '../../../interfaces/input.interface';
import { Subscription } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { CategoryActions } from '../../../../dashboard/state/actions/dashboard.actions';
import { ofType } from '@ngrx/effects';

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
		private categoryService: CategoryService,
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

	onClose(arg: boolean): void {
		this.visible = arg;
		this.visibleChange.emit(arg);
	}

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
			CategoryActions.addCategory({
				payload: { data: this.formatCategoryDatas() },
			}),
		);

		this.subscription.add(
			this.actionsSubject
				.pipe(ofType(CategoryActions.addCategorySuccess))
				.subscribe(() => {
					this.toastSuccess(
						`The category '${this.mainForm.value.name}' has been successfully added.`,
					);
				}),
		);
	}

	private updateCategory(): void {
		this.store.dispatch(
			CategoryActions.updateCategory({
				payload: {
					id: this.currentCategory.id as string,
					data: this.formatCategoryDatas(),
				},
			}),
		);

		this.subscription.add(
			this.actionsSubject
				.pipe(ofType(CategoryActions.updateCategorySuccess))
				.subscribe(() => {
					this.toastSuccess(
						`The category '${this.mainForm.value.name}' has been successfully updated.`,
					);
				}),
		);
	}

	private toastSuccess(message: string): void {
		this.messageService.add({
			severity: 'success',
			summary: message,
		});

		this.mainForm.reset();
		this.onClose(false);
	}

	private toastError(message: string) {
		this.messageService.add({
			severity: 'error',
			summary: message,
		});
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
}
