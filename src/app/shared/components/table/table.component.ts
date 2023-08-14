import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../model/category.model';
import {
	IconDefinition,
	faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { PaginatorState } from 'primeng/paginator';
import { IRowsPerPageOptions } from '../../interfaces/table.interface';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
	@Input() cols!: { header: string; field: string }[];
	@Input() items: Array<ICategory> = [];
	@Input() paginator!: boolean;
	@Input() rows!: number;
	@Input() showCurrentPageReport!: boolean;
	@Input() currentPageReportTemplate!: string;
	@Input() rowsPerPageOptions!: IRowsPerPageOptions[];
	@Input() first!: number;
	@Input() totalRecords!: number;

	myPaginationString!: string;
	deleteIcon!: IconDefinition;
	editIcon!: IconDefinition;

	ngOnInit(): void {
		this.deleteIcon = faTrashCan;
		this.editIcon = faPencil;
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
}
