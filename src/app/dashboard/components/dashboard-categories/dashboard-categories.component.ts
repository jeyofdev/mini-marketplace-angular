import { Component, OnInit } from '@angular/core';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { CategoryActions } from '../../state/actions/dashboard.actions';
import { getDashboardSelector } from '../../state/selectors/dashboard.selectors';
import { ICategory } from '../../../shared/model/category.model';
import { map } from 'rxjs';
import { DataService } from '../../../shared/service/data.service';
import { ICategoryTableColumns } from '../../../shared/interfaces/table.interface';

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

	constructor(
		private store: Store,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.iconAdd = faPlus;
		this.cols = this.dataService.getColsCategories();

		this.store.dispatch(CategoryActions.loadCategories());
		this.store
			.pipe(
				select(getDashboardSelector),
				map(categories => {
					this.categories = categories;
				}),
			)
			.subscribe();
	}

	openModalAddNewCategory(): void {
		this.sidebarVisible = true;
	}
}
