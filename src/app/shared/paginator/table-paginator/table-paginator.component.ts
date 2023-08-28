import { Component, Input } from '@angular/core';
import { IRowsPerPageSelectOptions } from '../../interfaces/table.interface';

@Component({
	selector: 'app-table-paginator',
	templateUrl: './table-paginator.component.html',
	styleUrls: ['./table-paginator.component.scss'],
})
export class TablePaginatorComponent {
	@Input() showCurrentPageReport!: boolean;
	@Input() rowsPerPageOptions!: IRowsPerPageSelectOptions[];
	@Input() rows!: number;
	@Input() first!: number;
	@Input() totalRecords!: number;
	@Input() paginationString!: string;
}
