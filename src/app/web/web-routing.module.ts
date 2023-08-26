import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChildrenComponent } from './pages/children/children.component';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductComponent } from './pages/product/product.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
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
		path: 'cart',
		component: CartPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WebRoutingModule {}
