import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextFieldComponent } from './components/input/text-field/text-field.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { ImageFullHeightComponent } from './components/input/image/image-full-height/image-full-height.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { NavLinkComponent } from './components/links/nav-link/nav-link.component';
import { FullnamePipe } from './pipe/fullname.pipe';
import { ModalAddCategoryComponent } from './components/modal/modal-add-category/modal-add-category.component';
import { ModalAddProductsComponent } from './components/modal/modal-add-products/modal-add-products.component';
import { SelectComponent } from './components/input/select/select.component';
import { SliderWithValueComponent } from './components/input/slider-with-value/slider-with-value.component';
import { CheckboxColorComponent } from './components/input/checkbox-color/checkbox-color.component';
import { PrimengModule } from './primeng.module';
import { DividerComponent } from './components/divider/divider.component';
import { ButtonComponent } from './components/button/button/button.component';
import { ErrorFieldComponent } from './components/error-field/error-field.component';
import { TextareaComponent } from './components/input/textarea/textarea.component';

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
		ModalAddCategoryComponent,
		ModalAddProductsComponent,
		SelectComponent,
		SliderWithValueComponent,
		CheckboxColorComponent,
		ErrorFieldComponent,
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
		TextFieldComponent,
		TextareaComponent,
		DividerComponent,
		AuthLayoutComponent,
		ImageFullHeightComponent,
		AlertComponent,
		DashboardLayoutComponent,
		NavLinkComponent,
		FullnamePipe,
		ModalAddCategoryComponent,
		ModalAddProductsComponent,
		SelectComponent,
		SliderWithValueComponent,
		CheckboxColorComponent,
		ButtonComponent,
		ErrorFieldComponent,
	],
})
export class SharedModule {}
