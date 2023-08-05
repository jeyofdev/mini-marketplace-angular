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
import { ToastComponent } from '../../toast/toast.component';

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

	ngOnInit(): void {
		this.iconClose = faXmark;
		this.iconDivider = faCircleDown;
		this.initMainForm();
		this.addCategoryValidationMessages = addCategoryValidationMessages;
	}

	constructor(
		public dialogRef: MatDialogRef<ModalAddCategoryComponent>,
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private _snackBar: MatSnackBar,
	) {}

	onClose(): void {
		this.dialogRef.close();
	}

	onMainFormSubmit(): void {
		this.categoryService
			.add(this.mainForm.value)
			.then(() => {
				this.openSnackBar(
					`The category '${this.mainForm.value.name}' has been added.`,
					'successfull',
				);

				this.mainForm.reset();
			})
			.catch(err => {
				this.openSnackBar(err.message, 'fail');
			});
	}

	openSnackBar(message: string, panelClass: string) {
		this._snackBar.openFromComponent(ToastComponent, {
			duration: 2000,
			horizontalPosition: 'right',
			verticalPosition: 'top',
			panelClass,
			data: {
				message,
			},
		});
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
}
