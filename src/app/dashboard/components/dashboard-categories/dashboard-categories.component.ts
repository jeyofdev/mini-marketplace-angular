import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from 'src/app/shared/components/modal/modal-add-category/modal-add-category.component';

@Component({
	selector: 'app-dashboard-categories',
	templateUrl: './dashboard-categories.component.html',
	styleUrls: ['./dashboard-categories.component.scss'],
})
export class DashboardCategoriesComponent {
	constructor(private dialog: MatDialog) {}

	openModalAddNewCategory() {
		const dialogRef = this.dialog.open(ModalAddCategoryComponent, {
			width: '400px',
			height: '100vh',
			position: { right: '0px', top: '0px' },
			panelClass: 'modal-add-category',
		});

		dialogRef.afterClosed().subscribe(() => {
			// eslint-disable-next-line no-console
			console.log('after close');
		});
	}
}
