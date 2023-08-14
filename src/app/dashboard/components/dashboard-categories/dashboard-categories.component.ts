import { Component, OnInit } from '@angular/core';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { CategoryActions } from '../../state/actions/dashboard.actions';
import {
	getDashboardCategoriesLoadingSelector,
	getDashboardCategoriesSelector,
} from '../../state/selectors/dashboard.selectors';
import { ICategory } from '../../../shared/model/category.model';
import { Observable, map } from 'rxjs';
import { DataService } from '../../../shared/service/data.service';
import {
	ICategoryTableColumns,
	IRowsPerPageOptions,
} from '../../../shared/interfaces/table.interface';

@Component({
	selector: 'app-dashboard-categories',
	templateUrl: './dashboard-categories.component.html',
	styleUrls: ['./dashboard-categories.component.scss'],
})
export class DashboardCategoriesComponent implements OnInit {
	iconAdd!: IconDefinition;
	categories!: ICategory[];
	cols!: ICategoryTableColumns[];
	sidebarVisible = false;
	totalRecords!: number;
	loading$!: Observable<boolean>;
	rowsPerPageOptions!: IRowsPerPageOptions[];

	constructor(
		private store: Store,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.iconAdd = faPlus;
		this.cols = this.dataService.getColsCategories();
		this.rowsPerPageOptions = [
			{ label: 5, value: 5 },
			{ label: 10, value: 10 },
			{ label: 25, value: 25 },
			{ label: 50, value: 50 },
		];

		this.store.dispatch(CategoryActions.loadCategories());

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
