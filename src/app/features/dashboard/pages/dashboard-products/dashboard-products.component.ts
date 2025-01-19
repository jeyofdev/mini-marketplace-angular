import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IProduct } from '@shared/model/product.model';
import { DataService } from '@shared/service/data.service';
import {
	IRowsPerPageSelectOptions,
	ITableColumns,
} from '@shared/interfaces/table.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardActions } from '@dashboard/state/actions/dashboard-index.actions';
import {
	getDashboardProductsLoadingSelector,
	getDashboardProductsSelector,
} from '@dashboard/state/selectors/dashboard-product.selectors';

@Component({
	selector: 'app-dashboard-products',
	templateUrl: './dashboard-products.component.html',
	styleUrls: ['./dashboard-products.component.scss'],
	providers: [ConfirmationService, MessageService],
})
export class DashboardProductsComponent implements OnInit {
	iconAdd!: string;
	loading$!: Observable<boolean>;
	products!: IProduct[];
	totalRecords!: number;
	rowsPerPageOptions$!: Observable<IRowsPerPageSelectOptions[]>;
	cols$!: Observable<ITableColumns[]>;

	sidebarVisible!: boolean;

	constructor(
		private store: Store,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.iconAdd = 'fa-solid fa-plus';
		this.cols$ = this.dataService.getColsProducts();
		this.rowsPerPageOptions$ = this.dataService.getRowsPerPageSelectOptions();
		this.sidebarVisible = false;

		this.store.dispatch(DashboardActions.products.loadProducts());
		this.loading$ = this.store.pipe(
			select(getDashboardProductsLoadingSelector),
		);

		this.store
			.pipe(
				select(getDashboardProductsSelector),
				map(products => {
					this.products = products;
					this.totalRecords = products.length;
				}),
			)
			.subscribe();
	}

	openModalAddNewProduct() {
		this.sidebarVisible = true;
	}
}
