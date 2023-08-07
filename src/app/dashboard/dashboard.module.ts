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
import { DashboardEffects } from './state/effects/dashboard.effects';

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
			fromDashboard.reducer,
			{
				metaReducers: fromDashboard.metaReducers,
			},
		),
		EffectsModule.forFeature([DashboardEffects]),
	],
})
export class DashboardModule {}
