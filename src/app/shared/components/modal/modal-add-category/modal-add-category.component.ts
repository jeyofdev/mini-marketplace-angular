import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
	IconDefinition,
	faXmark,
	faCircleDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-modal-add-category',
	templateUrl: './modal-add-category.component.html',
	styleUrls: ['./modal-add-category.component.scss'],
})
export class ModalAddCategoryComponent implements OnInit {
	iconClose!: IconDefinition;
	iconDivider!: IconDefinition;
	mainForm!: FormGroup;

	ngOnInit(): void {
		this.iconClose = faXmark;
		this.iconDivider = faCircleDown;
		this.initMainForm();
	}

	constructor(
		public dialogRef: MatDialogRef<ModalAddCategoryComponent>,
		private formBuilder: FormBuilder,
	) {}

	onClose(): void {
		this.dialogRef.close();
	}

	onMainFormSubmit(): void {
		// eslint-disable-next-line no-console
		console.log(this.mainForm.value);
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			name: [''],
			description: [''],
		});
	}
}
