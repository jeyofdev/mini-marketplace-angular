import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'dashboard',
		loadChildren: () =>
			import('./dashboard/dashboard.module').then(m => m.DashboardModule),
		data: {
			breadcrumb: 'Dashboard',
		},
	},
	{
		path: 'cart',
		loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
	},
	{
		path: '',
		loadChildren: () => import('./web/web.module').then(m => m.WebModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
