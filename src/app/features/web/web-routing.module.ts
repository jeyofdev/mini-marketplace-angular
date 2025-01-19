import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from '@web/pages/children/children.component';
import { MenComponent } from '@web/pages/men/men.component';
import { WomenComponent } from '@web/pages/women/women.component';
import { AllProductsComponent } from '@web/pages/all-products/all-products.component';
import { ProductComponent } from '@web/pages/product/product.component';
import { WishListComponent } from '@web/pages/wish-list/wish-list.component';

const routes: Routes = [
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

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WebRoutingModule {}
