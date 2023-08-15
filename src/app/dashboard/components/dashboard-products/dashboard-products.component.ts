import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard-products',
	templateUrl: './dashboard-products.component.html',
	styleUrls: ['./dashboard-products.component.scss'],
})
export class DashboardProductsComponent implements OnInit {
	sidebarVisible!: boolean;

	ngOnInit(): void {
		this.sidebarVisible = false;
	}

	openModalAddNewProduct() {
		this.sidebarVisible = true;
	}
}
