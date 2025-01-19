import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '@dashboard/auth/auth-routing.module';
import { LoginComponent } from '@dashboard/auth/pages/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { RegisterComponent } from '@dashboard/auth/pages/register/register.component';
import { DashboardModule } from '@dashboard/dashboard.module';
import { FormLoginComponent } from './components/form/form-login/form-login.component';
import { FormRegisterComponent } from './components/form/form-register/form-register.component';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		FormLoginComponent,
		FormRegisterComponent,
	],
	imports: [CommonModule, AuthRoutingModule, SharedModule, DashboardModule],
})
export class AuthModule {}
