import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { addCategoryValidationMessages } from '@dashboard/validations/messages.validation';
import { ICategory } from '@shared/model/category.model';
import { ChoiceItemType } from '@shared/model/input.interface';
import { DataService } from '@shared/service/data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-form-category',
	templateUrl: './form-category.component.html',
	styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {
	@Input() submitBtnLabel!: string;
	@Input() currentCategory!: ICategory;

	@Output() submitCategory: EventEmitter<FormGroup> =
		new EventEmitter<FormGroup>();

	status$!: Observable<ChoiceItemType[]>;

	mainForm!: FormGroup;
	nameCtrl!: FormControl<string | null>;
	descriptionCtrl!: FormControl<string | null>;
	statusCtrl!: FormControl<string | null>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addCategoryValidationMessages!: any;

	constructor(
		private formBuilder: FormBuilder,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.status$ = this.dataService.getAllStatus();

		this.initFormControls();
		this.initMainForm();

		if (this.currentCategory) {
			this.pathFormValue();
		}

		this.addCategoryValidationMessages = addCategoryValidationMessages;
	}

	onMainFormSubmit(): void {
		if (this.mainForm.valid) {
			this.submitCategory.emit(this.mainForm);
		}
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

	private pathFormValue(): void {
		this.mainForm.patchValue({
			name: this.currentCategory.name,
			description: this.currentCategory.description,
			status: this.currentCategory.status,
		});
	}
}
