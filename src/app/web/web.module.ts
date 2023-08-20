import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [HomeComponent, LayoutComponent],
	imports: [CommonModule, WebRoutingModule, SharedModule],
})
export class WebModule {}
