import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from '@dashboard/dashboard-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DashboardCategoriesComponent } from '@dashboard/pages/dashboard-categories/dashboard-categories.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from '@dashboard/state/reducers/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoryService } from '@shared/service/category.service';
import { DashboardCategoryEffects } from '@dashboard/state/effects/dashboard-category.effects';
import { DashboardProductEffects } from '@dashboard/state/effects/dashboard-product.effects';
import { DashboardHomeComponent } from '@dashboard/pages/dashboard-home/dashboard-home.component';
import { DashboardProductsComponent } from '@dashboard/pages/dashboard-products/dashboard-products.component';
import { HeaderComponent } from '@dashboard/components/header/header.component';
import { ModalCategoryComponent } from '@dashboard/components/modal/modal-category/modal-category.component';
import { ModalProductComponent } from '@dashboard/components/modal/modal-product/modal-product.component';
import { TableDashboardCategoryComponent } from '@dashboard/components/table/table-dashboard-category/table-dashboard-category.component';
import { TableDashboardProductComponent } from '@dashboard/components/table/table-dashboard-product/table-dashboard-product.component';
import { AuthLayoutComponent } from '@dashboard/components/layout/auth-layout/auth-layout.component';
import { CoreModule } from '@core/core.module';
import { DashboardLayoutComponent } from '@dashboard/components/layout/dashboard-layout/dashboard-layout.component';
import { FormCategoryComponent } from './components/form/form-category/form-category.component';
import { FormProductComponent } from './components/form/form-product/form-product.component';

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
		FormCategoryComponent,
		FormProductComponent,
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
