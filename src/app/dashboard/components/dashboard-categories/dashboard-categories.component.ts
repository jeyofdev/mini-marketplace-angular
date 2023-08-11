import { Component, OnInit } from '@angular/core';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { CategoryActions } from '../../state/actions/dashboard.actions';
import { getDashboardSelector } from '../../state/selectors/dashboard.selectors';
import { ICategory } from 'src/app/shared/model/category.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-dashboard-categories',
	templateUrl: './dashboard-categories.component.html',
	styleUrls: ['./dashboard-categories.component.scss'],
})
export class DashboardCategoriesComponent implements OnInit {
	iconAdd!: IconDefinition;
	categories$!: Observable<ICategory[]>;
	sidebarVisible = false;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.iconAdd = faPlus;

		this.store.dispatch(CategoryActions.loadCategories());
		this.categories$ = this.store.pipe(select(getDashboardSelector));
	}

	openModalAddNewCategory(): void {
		this.sidebarVisible = true;
	}
}
