import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChildrenComponent } from './pages/children/children.component';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';

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
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WebRoutingModule {}
