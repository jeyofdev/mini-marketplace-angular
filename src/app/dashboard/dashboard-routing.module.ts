import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCategoriesComponent } from './pages/dashboard-categories/dashboard-categories.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { DashboardProductsComponent } from './pages/dashboard-products/dashboard-products.component';

const routes: Routes = [
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
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
