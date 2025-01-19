import { Routes } from '@angular/router';
import { AllProductsComponent } from '@web/pages/all-products/all-products.component';
import { ChildrenComponent } from '@web/pages/children/children.component';
import { MenComponent } from '@web/pages/men/men.component';
import { ProductComponent } from '@web/pages/product/product.component';
import { WishListComponent } from '@web/pages/wish-list/wish-list.component';
import { WomenComponent } from '@web/pages/women/women.component';

export const routes: Routes = [
	{
		path: 'home',
		component: AllProductsComponent,
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'women',
		component: WomenComponent,
	},
	{
		path: 'men',
		component: MenComponent,
	},
	{
		path: 'children',
		component: ChildrenComponent,
	},
	{
		path: 'products',
		component: AllProductsComponent,
	},
	{
		path: 'products/:productId',
		component: ProductComponent,
	},
	{
		path: 'wish-list',
		component: WishListComponent,
	},
];
