import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextFieldComponent } from './components/input/text-field/text-field.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { ImageFullHeightComponent } from './components/image/image-full-height/image-full-height.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { NavLinkComponent } from './components/links/nav-link/nav-link.component';
import { FullnamePipe } from './pipe/fullname.pipe';
import { SelectComponent } from './components/input/select/select.component';
import { SliderWithValueComponent } from './components/input/slider-with-value/slider-with-value.component';
import { CheckboxColorComponent } from './components/input/checkbox-color/checkbox-color.component';
import { PrimengModule } from './primeng.module';
import { DividerComponent } from './components/divider/divider.component';
import { ButtonComponent } from './components/button/button/button.component';
import { ErrorFieldComponent } from './components/form/error-field/error-field.component';
import { TextareaComponent } from './components/input/textarea/textarea.component';
import { NumberFieldComponent } from './components/input/number-field/number-field.component';
import { PasswordFieldComponent } from './components/input/password-field/password-field.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { TableDashboardCategoryComponent } from './components/table/table-dashboard-category/table-dashboard-category.component';
import { TableDashboardProductComponent } from './components/table/table-dashboard-product/table-dashboard-product.component';
import { ModalProductComponent } from './components/modal/modal-product/modal-product.component';
import { ModalCategoryComponent } from './components/modal/modal-category/modal-category.component';

@NgModule({
	declarations: [
		TextFieldComponent,
		TextareaComponent,
		DividerComponent,
		AuthLayoutComponent,
		ImageFullHeightComponent,
		AlertComponent,
		DashboardLayoutComponent,
		ButtonComponent,
		NavLinkComponent,
		FullnamePipe,
		ModalCategoryComponent,
		ModalProductComponent,
		SelectComponent,
		SliderWithValueComponent,
		CheckboxColorComponent,
		ErrorFieldComponent,
		NumberFieldComponent,
		PasswordFieldComponent,
		BreadcrumbComponent,
		TableDashboardCategoryComponent,
		ConfirmDialogComponent,
		TableDashboardProductComponent,
	],
	imports: [
		CommonModule,
		PrimengModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		PrimengModule,
		FontAwesomeModule,
		TextFieldComponent,
		TextareaComponent,
		DividerComponent,
		AuthLayoutComponent,
		ImageFullHeightComponent,
		AlertComponent,
		DashboardLayoutComponent,
		NavLinkComponent,
		FullnamePipe,
		ModalCategoryComponent,
		ModalProductComponent,
		SelectComponent,
		SliderWithValueComponent,
		CheckboxColorComponent,
		ButtonComponent,
		ErrorFieldComponent,
		NumberFieldComponent,
		PasswordFieldComponent,
		BreadcrumbComponent,
		TableDashboardCategoryComponent,
		TableDashboardProductComponent,
		ConfirmDialogComponent,
	],
})
export class SharedModule {}
