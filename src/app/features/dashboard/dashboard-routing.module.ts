import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '@core/routes/feature-dashboard.routes';

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
