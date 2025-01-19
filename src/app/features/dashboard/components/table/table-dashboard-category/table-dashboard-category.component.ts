import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '@shared/model/category.model';

import { PaginatorState } from 'primeng/paginator';
import { IRowsPerPageSelectOptions } from '@shared/model/table.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
	FillFormWithCurrentCategoryFnType,
	ShowConfirmDialogFnType,
} from '@shared/types/index.type';
import { DashboardActions } from '@dashboard/state/actions/dashboard-index.actions';

@Component({
	selector: 'app-table-dashboard-category',
	templateUrl: './table-dashboard-category.component.html',
	styleUrls: ['./table-dashboard-category.component.scss'],
})
export class TableDashboardCategoryComponent implements OnInit {
	@Input() cols!: { header: string; field: string }[];
	@Input() items: Array<ICategory> = [];
	@Input() paginator!: boolean;
	@Input() rows!: number;
	@Input() showCurrentPageReport!: boolean;
	@Input() rowsPerPageOptions!: IRowsPerPageSelectOptions[];
	@Input() first!: number;
	@Input() totalRecords!: number;

	paginationString!: string;

	sidebarVisible = false;

	showConfirmDialogFn!: ShowConfirmDialogFnType;
	fillFormWithCurrentCategoryFn!: FillFormWithCurrentCategoryFnType;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
	) {}

	ngOnInit(): void {
		this.totalRecords = this.items.length;
		this.paginationString = `showing ${this.first + 1} to ${
			this.first + this.rows
		} of ${this.totalRecords} entries`;
	}

	setPaginationString(event: PaginatorState) {
		this.first = event.first as number;
		this.rows = event.rows as number;

		const last =
			this.rows + this.first <= this.totalRecords
				? this.rows + this.first
				: this.totalRecords;

		this.paginationString = `showing ${this.first + 1} to ${last} of ${
			this.totalRecords
		} entries`;
	}

	onRowSelect(event: number) {
		this.first = 1;
		this.rows = event;
		this.paginationString = `showing ${this.first} to ${this.rows} of ${this.totalRecords} entries`;
	}

	onAffich(showConfirmDialogFn: ShowConfirmDialogFnType) {
		this.showConfirmDialogFn = showConfirmDialogFn;
	}

	getCurrentCategory(
		fillFormWithCurrentCategoryFn: FillFormWithCurrentCategoryFnType,
	) {
		this.fillFormWithCurrentCategoryFn = fillFormWithCurrentCategoryFn;
	}

	onDelete(itemId: string, itemName: string): void {
		this.showConfirmDialogFn(
			this.confirmationService,
			this.messageService,
			DashboardActions.categories.deleteCategory,
			itemId,
			itemName,
		);
	}

	openModalUpdateCategory(category: ICategory): void {
		this.fillFormWithCurrentCategoryFn(category);
		this.sidebarVisible = true;
	}
}
