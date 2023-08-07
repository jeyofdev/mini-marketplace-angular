import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from 'src/app/shared/components/modal/modal-add-category/modal-add-category.component';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { CategoryActions } from '../../state/actions/dashboard.actions';
import { getDashboardSelector } from '../../state/selectors/dashboard.selectors';
import { ICategory } from 'src/app/shared/model/category.model';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-dashboard-categories',
	templateUrl: './dashboard-categories.component.html',
	styleUrls: ['./dashboard-categories.component.scss'],
})
export class DashboardCategoriesComponent implements OnInit, AfterViewInit {
	iconAdd!: IconDefinition;
	categories$!: Observable<ICategory[]>;

	displayedColumns: string[] = ['name'];
	dataSource = new MatTableDataSource<ICategory>();
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private dialog: MatDialog,
		private store: Store,
	) {}

	ngOnInit(): void {
		this.iconAdd = faPlus;

		this.store.dispatch(CategoryActions.loadCategories());
		this.categories$ = this.store.pipe(select(getDashboardSelector));

		this.categories$.subscribe(res => {
			this.dataSource.data = res;
			this.dataSource.paginator = this.paginator;
		});
	}

	openModalAddNewCategory() {
		const dialogRef = this.dialog.open(ModalAddCategoryComponent, {
			width: '500px',
			height: '100vh',
			position: { right: '0px', top: '0px' },
			panelClass: 'modal-add-category',
		});

		dialogRef.afterClosed().subscribe(() => {
			// eslint-disable-next-line no-console
			console.log('after close');
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}
}
