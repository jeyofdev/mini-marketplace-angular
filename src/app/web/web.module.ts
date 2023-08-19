import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
	declarations: [HomeComponent, LayoutComponent],
	imports: [CommonModule, WebRoutingModule],
})
export class WebModule {}
