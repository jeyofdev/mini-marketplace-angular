import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ICategory } from '@shared/model/category.model';
import { Observable, map } from 'rxjs';
import { DataService } from '@shared/service/data.service';
import {
	ITableColumns,
	IRowsPerPageSelectOptions,
} from '@shared/interfaces/table.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardActions } from '@dashboard/state/actions/dashboard-index.actions';
import {
	getDashboardCategoriesLoadingSelector,
	getDashboardCategoriesSelector,
} from '@dashboard/state/selectors/dashboard-category.selectors';

@Component({
	selector: 'app-dashboard-categories',
	templateUrl: './dashboard-categories.component.html',
	styleUrls: ['./dashboard-categories.component.scss'],
	providers: [ConfirmationService, MessageService],
})
export class DashboardCategoriesComponent implements OnInit {
	iconAdd!: string;
	categories!: ICategory[];
	cols$!: Observable<ITableColumns[]>;
	sidebarVisible = false;
	totalRecords!: number;
	loading$!: Observable<boolean>;
	rowsPerPageOptions$!: Observable<IRowsPerPageSelectOptions[]>;

	constructor(
		private store: Store,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.iconAdd = 'fa-solid fa-plus';
		this.cols$ = this.dataService.getColsCategories();
		this.rowsPerPageOptions$ = this.dataService.getRowsPerPageSelectOptions();

		this.store.dispatch(DashboardActions.categories.loadCategories());

		this.loading$ = this.store.pipe(
			select(getDashboardCategoriesLoadingSelector),
		);

		this.store
			.pipe(
				select(getDashboardCategoriesSelector),
				map(categories => {
					this.categories = categories;
					this.totalRecords = categories.length;
				}),
			)
			.subscribe();
	}

	openModalAddNewCategory(): void {
		this.sidebarVisible = true;
	}
}
