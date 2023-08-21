import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './components/nav/navigation/navigation.component';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { ChildrenComponent } from './pages/children/children.component';
import { NavigationLinkComponent } from './components/link/navigation-link/navigation-link.component';
import { HeaderUserActionComponent } from './components/header-user-action/header-user-action.component';
import { NavMobileComponent } from './components/nav/nav-mobile/nav-mobile.component';

@NgModule({
	declarations: [
		HomeComponent,
		LayoutComponent,
		NavigationComponent,
		MenComponent,
		WomenComponent,
		ChildrenComponent,
		NavigationLinkComponent,
		HeaderUserActionComponent,
		NavMobileComponent,
	],
	imports: [CommonModule, WebRoutingModule, SharedModule],
})
export class WebModule {}
