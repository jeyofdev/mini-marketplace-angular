import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardCategoriesComponent } from './pages/dashboard-categories/dashboard-categories.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './state/reducers/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoryService } from '../shared/service/category.service';
import { DashboardCategoryEffects } from './state/effects/dashboard-category.effects';
import { DashboardProductEffects } from './state/effects/dashboard-product.effects';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { DashboardProductsComponent } from './pages/dashboard-products/dashboard-products.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalCategoryComponent } from './components/modal/modal-category/modal-category.component';
import { ModalProductComponent } from './components/modal/modal-product/modal-product.component';
import { TableDashboardCategoryComponent } from './components/table/table-dashboard-category/table-dashboard-category.component';
import { TableDashboardProductComponent } from './components/table/table-dashboard-product/table-dashboard-product.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { CoreModule } from '../core/core.module';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout/dashboard-layout.component';

@NgModule({
	declarations: [
		DashboardHomeComponent,
		DashboardProductsComponent,
		DashboardCategoriesComponent,
		HeaderComponent,
		ModalCategoryComponent,
		ModalProductComponent,
		TableDashboardCategoryComponent,
		TableDashboardProductComponent,
		AuthLayoutComponent,
		DashboardLayoutComponent,
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		SharedModule,
		CoreModule,
		StoreModule.forFeature(
			fromDashboard.dashboardFeatureKey,
			fromDashboard.reducers,
			{
				metaReducers: fromDashboard.metaReducers,
			},
		),
		EffectsModule.forFeature([
			DashboardCategoryEffects,
			DashboardProductEffects,
		]),
	],
	exports: [AuthLayoutComponent],
	providers: [CategoryService],
})
export class DashboardModule {}
