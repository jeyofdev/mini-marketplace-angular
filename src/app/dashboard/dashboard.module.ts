import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { DashboardCategoriesComponent } from './components/dashboard-categories/dashboard-categories.component';
import { DashboardHeaderComponent } from './components/ui/dashboard-header/dashboard-header.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './state/reducers/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoryService } from '../shared/service/category.service';
import { DashboardCategoryEffects } from './state/effects/dashboard-category.effects';
import { DashboardProductEffects } from './state/effects/dashboard-product.effects';

@NgModule({
	declarations: [
		DashboardHomeComponent,
		DashboardProductsComponent,
		DashboardCategoriesComponent,
		DashboardHeaderComponent,
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		SharedModule,
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
	providers: [CategoryService],
})
export class DashboardModule {}
