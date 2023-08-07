import { CategoryService } from './../../../service/category.service';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
	IconDefinition,
	faXmark,
	faCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import { addCategoryValidationMessages } from '../../../validations/messages.validation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../../utils/form.utils';

@Component({
	selector: 'app-modal-add-category',
	templateUrl: './modal-add-category.component.html',
	styleUrls: ['./modal-add-category.component.scss'],
})
export class ModalAddCategoryComponent implements OnInit {
	iconClose!: IconDefinition;
	iconDivider!: IconDefinition;
	mainForm!: FormGroup;
	addCategoryValidationMessages!: any;

	constructor(
		public dialogRef: MatDialogRef<ModalAddCategoryComponent>,
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private _snackBar: MatSnackBar,
	) {}

	ngOnInit(): void {
		this.iconClose = faXmark;
		this.iconDivider = faCircleDown;
		this.initMainForm();
		this.addCategoryValidationMessages = addCategoryValidationMessages;
	}

	onClose(): void {
		this.dialogRef.close();
	}

	onMainFormSubmit(): void {
		this.addCategory();
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			name: [
				'',
				[
					Validators.required,
					Validators.minLength(
						addCategoryValidationMessages.name.minlength.value,
					),
					Validators.maxLength(
						addCategoryValidationMessages.name.maxlength.value,
					),
				],
			],
			description: [''],
		});
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
				openSnackBar(
					this._snackBar,
					`The category '${this.mainForm.value.name}' has been added.`,
					'successfull',
				);

				this.mainForm.reset();
			})
			.catch(err => {
				openSnackBar(this._snackBar, err.message, 'fail');
			});
	}
}
