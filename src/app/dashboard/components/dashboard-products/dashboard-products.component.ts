import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ProductActions } from '../../state/actions/dashboard.actions';
import {
	getDashboardProductsLoadingSelector,
	getDashboardProductsSelector,
} from '../../state/selectors/dashboard.selectors';
import { IProduct } from '../../../shared/model/product.model';
import { DataService } from '../../../shared/service/data.service';
import {
	IRowsPerPageSelectOptions,
	ITableColumns,
} from '../../../shared/interfaces/table.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

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
	rowsPerPageOptions!: IRowsPerPageSelectOptions[];
	cols!: ITableColumns[];

	sidebarVisible!: boolean;

	constructor(
		private store: Store,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.iconAdd = 'fa-solid fa-plus';
		this.cols = this.dataService.getColsProducts();
		this.rowsPerPageOptions = this.dataService.getRowsPerPageSelectOptions();
		this.sidebarVisible = false;

		this.store.dispatch(ProductActions.loadProducts());
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
