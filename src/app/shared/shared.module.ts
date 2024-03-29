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
import { LogoComponent } from './components/logo/logo.component';
import { ConvertToStringPipe } from './pipe/convert-to-string.pipe';
import { PanelComponent } from './components/panel/panel.component';
import { ButtonRoundedComponent } from './components/button/button-rounded/button-rounded.component';
import { ButtonCircleComponent } from './components/button/button-circle/button-circle.component';
import { ChipComponent } from './components/chip/chip/chip.component';
import { BaseChipComponent } from './components/chip/base-chip/base-chip.component';
import { ButtonCircularRadiusComponent } from './components/button/button-circular-radius/button-circular-radius.component';
import { RatingComponent } from './components/rating/rating.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ChipCircleComponent } from './components/chip/chip-circle/chip-circle.component';
import { OptionComponent } from './components/option/option.component';
import { SelectMultipleComponent } from './components/input/select-multiple/select-multiple.component';
import { CheckboxColorBorderComponent } from './components/input/checkbox/checkbox-color-border/checkbox-color-border.component';
import { RadioBaseComponent } from './components/input/radio/radio-base/radio-base.component';
import { RadioSquareComponent } from './components/input/radio/radio-square/radio-square.component';
import { RadioColorComponent } from './components/input/radio/radio-color/radio-color.component';
import { ButtonEmptyComponent } from './components/button/button-empty/button-empty.component';
import { ChipSquareComponent } from './components/chip/chip-square/chip-square.component';
import { NumberFieldWithButtonComponent } from './components/input/number-field-with-button/number-field-with-button.component';
import { TablePaginatorComponent } from './paginator/table-paginator/table-paginator.component';
import { InputMaskComponent } from './components/input/input-mask/input-mask.component';
import { CheckboxBaseComponent } from './components/input/checkbox/checkbox-base/checkbox-base.component';
import { CheckboxChipComponent } from './components/input/checkbox/checkbox-chip/checkbox-chip.component';

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
		CheckboxColorBorderComponent,
		ErrorFieldComponent,
		NumberFieldComponent,
		PasswordFieldComponent,
		BreadcrumbComponent,
		ConfirmDialogComponent,
		BadgeColorComponent,
		PriceComponent,
		TagComponent,
		ChipComponent,
		RadioBaseComponent,
		LogoComponent,
		PanelComponent,
		ButtonRoundedComponent,
		ButtonCircleComponent,
		BaseChipComponent,
		ButtonCircularRadiusComponent,
		RatingComponent,
		ChipCircleComponent,
		LoaderComponent,
		SelectMultipleComponent,
		OptionComponent,
		RadioSquareComponent,
		RadioColorComponent,
		ButtonEmptyComponent,
		ChipSquareComponent,
		NumberFieldWithButtonComponent,
		TablePaginatorComponent,
		InputMaskComponent,
		CheckboxBaseComponent,
		CheckboxChipComponent,
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
		CheckboxColorBorderComponent,
		ButtonComponent,
		ErrorFieldComponent,
		NumberFieldComponent,
		PasswordFieldComponent,
		BreadcrumbComponent,
		ConfirmDialogComponent,
		BadgeColorComponent,
		PriceComponent,
		TagComponent,
		ChipComponent,
		RadioBaseComponent,
		LogoComponent,
		ConvertToStringPipe,
		PanelComponent,
		ButtonRoundedComponent,
		ButtonCircleComponent,
		BaseChipComponent,
		ButtonCircularRadiusComponent,
		RatingComponent,
		LoaderComponent,
		ChipCircleComponent,
		OptionComponent,
		SelectMultipleComponent,
		RadioSquareComponent,
		RadioColorComponent,
		ButtonEmptyComponent,
		ChipSquareComponent,
		NumberFieldWithButtonComponent,
		InputMaskComponent,
		CheckboxBaseComponent,
		CheckboxChipComponent,
		TablePaginatorComponent,
	],
})
export class SharedModule {}
