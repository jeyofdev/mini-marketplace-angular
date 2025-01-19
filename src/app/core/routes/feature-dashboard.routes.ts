import { Routes } from '@angular/router';
import { DashboardCategoriesComponent } from '@dashboard/pages/dashboard-categories/dashboard-categories.component';
import { DashboardHomeComponent } from '@dashboard/pages/dashboard-home/dashboard-home.component';
import { DashboardProductsComponent } from '@dashboard/pages/dashboard-products/dashboard-products.component';

export const routes: Routes = [
	{
		path: 'home',
		component: DashboardHomeComponent,
		data: {
			breadcrumb: 'Home',
		},
	},
	{
		path: 'products',
		component: DashboardProductsComponent,
		data: {
			breadcrumb: 'Products',
		},
	},
	{
		path: 'categories',
		component: DashboardCategoriesComponent,
		data: {
			breadcrumb: 'Categories',
		},
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('@dashboard/auth/auth.module').then(m => m.AuthModule),
	},
];
