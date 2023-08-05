import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-modal-add-category',
	templateUrl: './modal-add-category.component.html',
	styleUrls: ['./modal-add-category.component.scss'],
})
export class ModalAddCategoryComponent {
	constructor(public dialogRef: MatDialogRef<ModalAddCategoryComponent>) {}

	onClose(): void {
		this.dialogRef.close();
	}
}
