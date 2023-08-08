import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SquareButtonComponent } from './components/button/square-button/square-button.component';
import { TextFieldComponent } from './components/input/text-field/text-field.component';
import { HorizontalDividerComponent } from './components/divider/horizontal-divider/horizontal-divider.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { ImageFullHeightComponent } from './components/input/image/image-full-height/image-full-height.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout/dashboard-layout.component';
import { ExtendedButtonComponent } from './components/button/extended-button/extended-button.component';
import { RouterModule } from '@angular/router';
import { IconButtonComponent } from './components/button/icon-button/icon-button.component';
import { NavLinkComponent } from './components/links/nav-link/nav-link.component';
import { FullnamePipe } from './pipe/fullname.pipe';
import { ModalAddCategoryComponent } from './components/modal/modal-add-category/modal-add-category.component';
import { ModalAddProductsComponent } from './components/modal/modal-add-products/modal-add-products.component';
import { ToastComponent } from './components/toast/toast.component';
import { SelectComponent } from './components/input/select/select.component';
import { SliderWithValueComponent } from './components/input/slider-with-value/slider-with-value.component';
import { CheckboxColorComponent } from './components/input/checkbox-color/checkbox-color.component';
import { PrimengModule } from './primeng.module';

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
		NavLinkComponent,
		FullnamePipe,
		ModalAddCategoryComponent,
		ModalAddProductsComponent,
		ToastComponent,
		SelectComponent,
		SliderWithValueComponent,
		CheckboxColorComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		PrimengModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		PrimengModule,
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
		NavLinkComponent,
		FullnamePipe,
		ModalAddCategoryComponent,
		ModalAddProductsComponent,
		ToastComponent,
		SelectComponent,
		SliderWithValueComponent,
		CheckboxColorComponent,
	],
})
export class SharedModule {}
