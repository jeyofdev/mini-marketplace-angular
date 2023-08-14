import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../model/category.model';
import {
	IconDefinition,
	faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

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
	@Input() rowsPerPageOptions!: number[];

	deleteIcon!: IconDefinition;
	editIcon!: IconDefinition;

	ngOnInit(): void {
		this.deleteIcon = faTrashCan;
		this.editIcon = faPencil;
	}
}
