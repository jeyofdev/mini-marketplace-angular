import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductActions } from '../../state/actions/dashboard.actions';
import { getDashboardProductsLoadingSelector } from '../../state/selectors/dashboard.selectors';

@Component({
	selector: 'app-dashboard-products',
	templateUrl: './dashboard-products.component.html',
	styleUrls: ['./dashboard-products.component.scss'],
})
export class DashboardProductsComponent implements OnInit {
	iconAdd!: string;
	loading$!: Observable<boolean>;
	sidebarVisible!: boolean;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.iconAdd = 'fa-solid fa-plus';
		this.sidebarVisible = false;

		this.store.dispatch(ProductActions.loadProducts());
		this.loading$ = this.store.pipe(
			select(getDashboardProductsLoadingSelector),
		);
	}

	openModalAddNewProduct() {
		this.sidebarVisible = true;
	}
}
