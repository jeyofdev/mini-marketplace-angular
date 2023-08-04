import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { DashboardCategoriesComponent } from './components/dashboard-categories/dashboard-categories.component';

@NgModule({
	declarations: [
		DashboardHomeComponent,
		DashboardProductsComponent,
		DashboardCategoriesComponent,
	],
	imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
