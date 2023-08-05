import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from '../modal-add-category/modal-add-category.component';

@Component({
	selector: 'app-modal-add-products',
	templateUrl: './modal-add-products.component.html',
	styleUrls: ['./modal-add-products.component.scss'],
})
export class ModalAddProductsComponent {
	constructor(public dialogRef: MatDialogRef<ModalAddCategoryComponent>) {}

	onClose(): void {
		this.dialogRef.close();
	}
}
