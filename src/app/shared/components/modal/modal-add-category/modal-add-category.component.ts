import { CategoryService } from './../../../service/category.service';
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

@Component({
	selector: 'app-modal-add-category',
	templateUrl: './modal-add-category.component.html',
	styleUrls: ['./modal-add-category.component.scss'],
	providers: [MessageService],
})
export class ModalAddCategoryComponent implements OnInit {
	@Input() visible!: boolean;
	@Input() position!: 'left' | 'right' | 'top' | 'bottom';
	@Output() visibleChange = new EventEmitter<boolean>();

	iconClose!: IconDefinition;
	iconDivider!: IconDefinition;

	mainForm!: FormGroup;
	nameCtrl!: FormControl<string | null>;
	descriptionCtrl!: FormControl<string | null>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addCategoryValidationMessages!: any;

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
	}

	onClose(arg: boolean): void {
		this.visible = arg;
		this.visibleChange.emit(arg);
	}

	onMainFormSubmit(): void {
		this.addCategory();
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
		const newCategory = {
			name:
				this.mainForm.value.name.slice(0, 1).toUpperCase() +
				this.mainForm.value.name.slice(1),
			description: this.mainForm.value.description,
		};
		this.categoryService
			.add(newCategory)
			.then(() => {
				this.messageService.add({
					severity: 'success',
					summary: `The category '${this.mainForm.value.name}' has been added.`,
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
}
