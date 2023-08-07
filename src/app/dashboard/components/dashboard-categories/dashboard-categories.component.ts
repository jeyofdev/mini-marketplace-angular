import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from 'src/app/shared/components/modal/modal-add-category/modal-add-category.component';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-dashboard-categories',
	templateUrl: './dashboard-categories.component.html',
	styleUrls: ['./dashboard-categories.component.scss'],
})
export class DashboardCategoriesComponent implements OnInit {
	iconAdd!: IconDefinition;

	constructor(private dialog: MatDialog) {}

	ngOnInit(): void {
		this.iconAdd = faPlus;
	}

	openModalAddNewCategory() {
		const dialogRef = this.dialog.open(ModalAddCategoryComponent, {
			width: '500px',
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
