import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextFieldComponent } from '@shared/components/input/text-field/text-field.component';
import { ImageFullHeightComponent } from '@shared/components/image/image-full-height/image-full-height.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { RouterModule } from '@angular/router';
import { NavLinkComponent } from '@shared/components/links/nav-link/nav-link.component';
import { FullnamePipe } from '@shared/pipe/fullname.pipe';
import { SelectComponent } from '@shared/components/input/select/select.component';
import { SliderWithValueComponent } from '@shared/components/input/slider-with-value/slider-with-value.component';
import { CheckboxColorComponent } from '@shared/components/input/checkbox/checkbox-color/checkbox-color.component';
import { PrimengModule } from '@shared/primeng.module';
import { DividerComponent } from '@shared/components/divider/divider.component';
import { ButtonComponent } from '@shared/components/button/button/button.component';
import { ErrorFieldComponent } from '@shared/components/form/error-field/error-field.component';
import { TextareaComponent } from '@shared/components/input/textarea/textarea.component';
import { NumberFieldComponent } from '@shared/components/input/number-field/number-field.component';
import { PasswordFieldComponent } from '@shared/components/input/password-field/password-field.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ConfirmDialogComponent } from '@shared/components/dialog/confirm-dialog/confirm-dialog.component';
import { BadgeColorComponent } from '@shared/components/badge-color/badge-color.component';
import { PriceComponent } from '@shared/components/price/price.component';
import { TagComponent } from '@shared/components/tag/tag.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { ConvertToStringPipe } from '@shared/pipe/convert-to-string.pipe';
import { PanelComponent } from '@shared/components/panel/panel.component';
import { ButtonRoundedComponent } from '@shared/components/button/button-rounded/button-rounded.component';
import { ButtonCircleComponent } from '@shared/components/button/button-circle/button-circle.component';
import { ChipComponent } from '@shared/components/chip/chip/chip.component';
import { BaseChipComponent } from '@shared/components/chip/base-chip/base-chip.component';
import { ButtonCircularRadiusComponent } from '@shared/components/button/button-circular-radius/button-circular-radius.component';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ChipCircleComponent } from '@shared/components/chip/chip-circle/chip-circle.component';
import { OptionComponent } from '@shared/components/option/option.component';
import { SelectMultipleComponent } from '@shared/components/input/select-multiple/select-multiple.component';
import { CheckboxColorBorderComponent } from '@shared/components/input/checkbox/checkbox-color-border/checkbox-color-border.component';
import { RadioBaseComponent } from '@shared/components/input/radio/radio-base/radio-base.component';
import { RadioSquareComponent } from '@shared/components/input/radio/radio-square/radio-square.component';
import { RadioColorComponent } from '@shared/components/input/radio/radio-color/radio-color.component';
import { ButtonEmptyComponent } from '@shared/components/button/button-empty/button-empty.component';
import { ChipSquareComponent } from '@shared/components/chip/chip-square/chip-square.component';
import { NumberFieldWithButtonComponent } from '@shared/components/input/number-field-with-button/number-field-with-button.component';
import { TablePaginatorComponent } from '@shared/paginator/table-paginator/table-paginator.component';
import { InputMaskComponent } from '@shared/components/input/input-mask/input-mask.component';
import { CheckboxBaseComponent } from '@shared/components/input/checkbox/checkbox-base/checkbox-base.component';
import { CheckboxChipComponent } from '@shared/components/input/checkbox/checkbox-chip/checkbox-chip.component';

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
