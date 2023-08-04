import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { DashboardCategoriesComponent } from './components/dashboard-categories/dashboard-categories.component';

const routes: Routes = [
	{
		path: 'home',
		component: DashboardHomeComponent,
	},
	{
		path: 'products',
		component: DashboardProductsComponent,
	},
	{
		path: 'categories',
		component: DashboardCategoriesComponent,
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
