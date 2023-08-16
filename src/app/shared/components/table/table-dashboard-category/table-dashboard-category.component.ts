import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../../model/category.model';

import { PaginatorState } from 'primeng/paginator';
import { IRowsPerPageSelectOptions } from '../../../interfaces/table.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
	FillFormWithCurrentCategoryFnType,
	ShowConfirmDialogFnType,
} from '../../../types/index.type';
import { CategoryService } from '../../../service/category.service';

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
	@Input() currentPageReportTemplate!: string;
	@Input() rowsPerPageOptions!: IRowsPerPageSelectOptions[];
	@Input() first!: number;
	@Input() totalRecords!: number;

	myPaginationString!: string;

	sidebarVisible = false;

	showConfirmDialogFn!: ShowConfirmDialogFnType;
	fillFormWithCurrentCategoryFn!: FillFormWithCurrentCategoryFnType;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private categoryService: CategoryService,
	) {}

	ngOnInit(): void {
		this.totalRecords = this.items.length;
		this.myPaginationString = `showing ${this.first + 1} to ${
			this.first + this.rows
		} of ${this.totalRecords} entries`;
	}

	setMyPagination(event: PaginatorState) {
		this.first = event.first as number;
		this.rows = event.rows as number;

		const last =
			this.rows + this.first <= this.totalRecords
				? this.rows + this.first
				: this.totalRecords;

		this.myPaginationString = `showing ${this.first + 1} to ${last} of ${
			this.totalRecords
		} entries`;
	}

	onRowSelect(event: number) {
		this.first = 1;
		this.rows = event;
		this.myPaginationString = `showing ${this.first} to ${this.rows} of ${this.totalRecords} entries`;
	}

	onAffich(showConfirmDialogFn: ShowConfirmDialogFnType) {
		this.showConfirmDialogFn = showConfirmDialogFn;
	}

	getCurrentCategory(
		fillFormWithCurrentCategoryFn: FillFormWithCurrentCategoryFnType,
	) {
		this.fillFormWithCurrentCategoryFn = fillFormWithCurrentCategoryFn;
	}

	onDelete(categoryId: string, categoryName: string): void {
		this.showConfirmDialogFn(
			this.confirmationService,
			this.messageService,
			this.categoryService.deleteById,
			categoryId,
			categoryName,
		);
	}

	openModalUpdateCategory(category: ICategory): void {
		this.fillFormWithCurrentCategoryFn(category);
		this.sidebarVisible = true;
	}
}
