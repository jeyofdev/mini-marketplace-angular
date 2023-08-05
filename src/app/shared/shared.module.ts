import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SquareButtonComponent } from './components/button/square-button/square-button.component';
import { TextFieldComponent } from './components/input/text-field/text-field.component';
import { HorizontalDividerComponent } from './components/divider/horizontal-divider/horizontal-divider.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { ImageFullHeightComponent } from './components/image/image-full-height/image-full-height.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout/dashboard-layout.component';
import { ExtendedButtonComponent } from './components/button/extended-button/extended-button.component';
import { RouterModule } from '@angular/router';
import { IconButtonComponent } from './components/button/icon-button/icon-button.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { NavLinkComponent } from './components/links/nav-link/nav-link.component';
import { FullnamePipe } from './pipe/fullname.pipe';
import { ModalAddCategoryComponent } from './components/modal/modal-add-category/modal-add-category.component';
import { ModalAddProductsComponent } from './components/modal/modal-add-products/modal-add-products.component';

@NgModule({
	declarations: [
		SquareButtonComponent,
		TextFieldComponent,
		HorizontalDividerComponent,
		AuthLayoutComponent,
		ImageFullHeightComponent,
		AlertComponent,
		DashboardLayoutComponent,
		ExtendedButtonComponent,
		IconButtonComponent,
		AvatarComponent,
		NavLinkComponent,
		FullnamePipe,
		ModalAddCategoryComponent,
		ModalAddProductsComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		RouterModule,
	],
	exports: [
		ReactiveFormsModule,
		MaterialModule,
		FontAwesomeModule,
		SquareButtonComponent,
		TextFieldComponent,
		HorizontalDividerComponent,
		AuthLayoutComponent,
		ImageFullHeightComponent,
		AlertComponent,
		DashboardLayoutComponent,
		ExtendedButtonComponent,
		IconButtonComponent,
		AvatarComponent,
		NavLinkComponent,
		FullnamePipe,
		ModalAddCategoryComponent,
		ModalAddProductsComponent,
	],
})
export class SharedModule {}
