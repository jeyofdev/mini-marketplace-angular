import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from '../modal-add-category/modal-add-category.component';
import { IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISelectItem } from 'src/app/shared/interfaces/input.interface';

@Component({
	selector: 'app-modal-add-products',
	templateUrl: './modal-add-products.component.html',
	styleUrls: ['./modal-add-products.component.scss'],
})
export class ModalAddProductsComponent implements OnInit {
	iconClose!: IconDefinition;
	mainForm!: FormGroup;

	categories!: ISelectItem[];

	constructor(
		public dialogRef: MatDialogRef<ModalAddCategoryComponent>,
		private formBuilder: FormBuilder,
	) {}

	ngOnInit(): void {
		this.iconClose = faXmark;
		this.categories = [
			{ value: 'cat-1', label: 'cat 1' },
			{ value: 'cat-2', label: 'cat 2' },
			{ value: 'cat-3', label: 'cat 3' },
			{ value: 'cat-4', label: 'cat 4' },
			{ value: 'cat-5', label: 'cat 5' },
		];
		this.initMainForm();
	}

	onMainFormSubmit(): void {
		// eslint-disable-next-line no-console
		console.log(this.mainForm.value);
	}

	onClose(): void {
		this.dialogRef.close();
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			brandName: [''],
			modelName: [''],
			price: [''],
			category: [''],
		});
	}
}
