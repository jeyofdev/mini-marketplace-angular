import { Component, OnInit } from '@angular/core';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-dashboard-products',
	templateUrl: './dashboard-products.component.html',
	styleUrls: ['./dashboard-products.component.scss'],
})
export class DashboardProductsComponent implements OnInit {
	sidebarVisible!: boolean;
	iconAdd!: IconDefinition;

	ngOnInit(): void {
		this.iconAdd = faPlus;
		this.sidebarVisible = false;
	}

	openModalAddNewProduct() {
		this.sidebarVisible = true;
	}
}
