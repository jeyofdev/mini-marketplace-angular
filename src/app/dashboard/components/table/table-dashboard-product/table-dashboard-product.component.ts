import { Component, Input, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IRowsPerPageSelectOptions } from '../../../../shared/interfaces/table.interface';
import { IProduct } from '../../../../shared/model/product.model';
import {
	FillFormWithCurrentProductFnType,
	ShowConfirmDialogFnType,
} from '../../../../shared/types/index.type';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CurrencyEnum } from '../../../../shared/enum/properties.enum';
import { DashboardActions } from 'src/app/dashboard/state/actions/dashboard-index.actions';

@Component({
	selector: 'app-table-dashboard-product',
	templateUrl: './table-dashboard-product.component.html',
	styleUrls: ['./table-dashboard-product.component.scss'],
})
export class TableDashboardProductComponent implements OnInit {
	@Input() cols!: { header: string; field: string }[];
	@Input() items: Array<IProduct> = [];
	@Input() paginator!: boolean;
	@Input() rows!: number;
	@Input() showCurrentPageReport!: boolean;
	@Input() currentPageReportTemplate!: string;
	@Input() rowsPerPageOptions!: IRowsPerPageSelectOptions[];
	@Input() first!: number;
	@Input() totalRecords!: number;

	currencyEnum = CurrencyEnum;

	myPaginationString!: string;

	sidebarVisible = false;

	showConfirmDialogFn!: ShowConfirmDialogFnType;
	fillFormWithCurrentProductFn!: FillFormWithCurrentProductFnType;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
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

	getCurrentProduct(
		fillFormWithCurrentProductFn: FillFormWithCurrentProductFnType,
	) {
		this.fillFormWithCurrentProductFn = fillFormWithCurrentProductFn;
	}

	onDelete(itemId: string, itemName: string): void {
		this.showConfirmDialogFn(
			this.confirmationService,
			this.messageService,
			DashboardActions.products.deleteProduct,
			itemId,
			itemName,
		);
	}

	openModalUpdateProduct(product: IProduct): void {
		this.fillFormWithCurrentProductFn(product);
		this.sidebarVisible = true;
	}
}