import { CategoryService } from '../../../service/category.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import {
	IconDefinition,
	faXmark,
	faCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import { addCategoryValidationMessages } from '../../../validations/messages.validation';
import { MessageService } from 'primeng/api';
import { ICategory } from '../../../model/category.model';
import { FillFormWithCurrentCategoryFnType } from '../../../types/index.type';

@Component({
	selector: 'app-modal-category',
	templateUrl: './modal-category.component.html',
	styleUrls: ['./modal-category.component.scss'],
	providers: [MessageService],
})
export class ModalAddCategoryComponent implements OnInit {
	@Input() visible!: boolean;
	@Input() position!: 'left' | 'right' | 'top' | 'bottom';
	@Input() title!: string;
	@Output() visibleChange = new EventEmitter<boolean>();
	@Output() fillFormCategory =
		new EventEmitter<FillFormWithCurrentCategoryFnType>();

	iconClose!: IconDefinition;
	iconDivider!: IconDefinition;

	mainForm!: FormGroup;
	nameCtrl!: FormControl<string | null>;
	descriptionCtrl!: FormControl<string | null>;

	submitBtnLabel!: string;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addCategoryValidationMessages!: any;

	currentCategory!: ICategory;

	constructor(
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private messageService: MessageService,
	) {}

	ngOnInit(): void {
		this.iconClose = faXmark;
		this.iconDivider = faCircleDown;

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
	}

	private addCategory(): void {
		const newCategory = this.formatCategoryDatas();

		this.categoryService
			.add(newCategory)
			.then(() => {
				this.toastSuccess(
					`The category '${this.mainForm.value.name}' has been successfully added.`,
				);
			})
			.catch(err => this.toastError(err.message));
	}

	private updateCategory(): void {
		const updateCategory = this.formatCategoryDatas();

		this.categoryService
			.updateById(this.currentCategory.id as string, updateCategory)
			.then(() => {
				this.toastSuccess(
					`The category '${this.mainForm.value.name}' has been successfully updated.`,
				);
			})
			.catch(err => this.toastError(err.message));
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

	private formatCategoryDatas(): ICategory {
		return {
			name:
				this.mainForm.value.name.slice(0, 1).toUpperCase() +
				this.mainForm.value.name.slice(1),
			description: this.mainForm.value.description,
		};
	}
}