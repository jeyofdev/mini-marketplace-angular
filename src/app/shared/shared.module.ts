import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextFieldComponent } from './components/input/text-field/text-field.component';
import { ImageFullHeightComponent } from './components/image/image-full-height/image-full-height.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { RouterModule } from '@angular/router';
import { NavLinkComponent } from './components/links/nav-link/nav-link.component';
import { FullnamePipe } from './pipe/fullname.pipe';
import { SelectComponent } from './components/input/select/select.component';
import { SliderWithValueComponent } from './components/input/slider-with-value/slider-with-value.component';
import { CheckboxColorComponent } from './components/input/checkbox/checkbox-color/checkbox-color.component';
import { PrimengModule } from './primeng.module';
import { DividerComponent } from './components/divider/divider.component';
import { ButtonComponent } from './components/button/button/button.component';
import { ErrorFieldComponent } from './components/form/error-field/error-field.component';
import { TextareaComponent } from './components/input/textarea/textarea.component';
import { NumberFieldComponent } from './components/input/number-field/number-field.component';
import { PasswordFieldComponent } from './components/input/password-field/password-field.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { BadgeColorComponent } from './components/badge-color/badge-color.component';
import { PriceComponent } from './components/price/price.component';
import { TagComponent } from './components/tag/tag.component';
import { ShipComponent } from './components/ship/ship.component';
import { RadioComponent } from './components/input/radio/radio.component';
import { LogoComponent } from './components/logo/logo.component';
import { ConvertToStringPipe } from './pipe/convert-to-string.pipe';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
	declarations: [
		TextFieldComponent,
		TextareaComponent,
		DividerComponent,
		ImageFullHeightComponent,
		AlertComponent,
		ButtonComponent,
		NavLinkComponent,
		FullnamePipe,
		ConvertToStringPipe,
		SelectComponent,
		SliderWithValueComponent,
		CheckboxColorComponent,
		ErrorFieldComponent,
		NumberFieldComponent,
		PasswordFieldComponent,
		BreadcrumbComponent,
		ConfirmDialogComponent,
		BadgeColorComponent,
		PriceComponent,
		TagComponent,
		ShipComponent,
		RadioComponent,
		LogoComponent,
		PanelComponent,
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
		ImageFullHeightComponent,
		AlertComponent,
		NavLinkComponent,
		FullnamePipe,
		SelectComponent,
		SliderWithValueComponent,
		CheckboxColorComponent,
		ButtonComponent,
		ErrorFieldComponent,
		NumberFieldComponent,
		PasswordFieldComponent,
		BreadcrumbComponent,
		ConfirmDialogComponent,
		BadgeColorComponent,
		PriceComponent,
		TagComponent,
		ShipComponent,
		RadioComponent,
		LogoComponent,
		ConvertToStringPipe,
		PanelComponent,
	],
})
export class SharedModule {}
