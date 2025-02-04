import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '@shared/module/primeng.module';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { BadgeColorComponent } from '@shared/components/badge-color/badge-color.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ButtonCircleComponent } from '@shared/components/button/button-circle/button-circle.component';
import { ButtonCircularRadiusComponent } from '@shared/components/button/button-circular-radius/button-circular-radius.component';
import { ButtonEmptyComponent } from '@shared/components/button/button-empty/button-empty.component';
import { ButtonRoundedComponent } from '@shared/components/button/button-rounded/button-rounded.component';
import { ButtonComponent } from '@shared/components/button/button/button.component';
import { BaseChipComponent } from '@shared/components/chip/base-chip/base-chip.component';
import { ChipCircleComponent } from '@shared/components/chip/chip-circle/chip-circle.component';
import { ChipSquareComponent } from '@shared/components/chip/chip-square/chip-square.component';
import { ChipComponent } from '@shared/components/chip/chip/chip.component';
import { ConfirmDialogComponent } from '@shared/components/dialog/confirm-dialog/confirm-dialog.component';
import { DividerComponent } from '@shared/components/divider/divider.component';
import { ErrorFieldComponent } from '@shared/components/form/error-field/error-field.component';
import { ImageFullHeightComponent } from '@shared/components/image/image-full-height/image-full-height.component';
import { CheckboxBaseComponent } from '@shared/components/form/checkbox/checkbox-base/checkbox-base.component';
import { CheckboxChipComponent } from '@shared/components/form/checkbox/checkbox-chip/checkbox-chip.component';
import { CheckboxColorBorderComponent } from '@shared/components/form/checkbox/checkbox-color-border/checkbox-color-border.component';
import { CheckboxColorComponent } from '@shared/components/form/checkbox/checkbox-color/checkbox-color.component';
import { MaskFieldComponent } from '@shared/components/form/mask-field/mask-field.component';
import { NumberFieldWithButtonComponent } from '@shared/components/form/number-field-with-button/number-field-with-button.component';
import { NumberFieldComponent } from '@shared/components/form/number-field/number-field.component';
import { PasswordFieldComponent } from '@shared/components/form/password-field/password-field.component';
import { RadioBaseComponent } from '@shared/components/form/radio/radio-base/radio-base.component';
import { RadioColorComponent } from '@shared/components/form/radio/radio-color/radio-color.component';
import { RadioSquareComponent } from '@shared/components/form/radio/radio-square/radio-square.component';
import { SelectMultipleComponent } from '@shared/components/form/select-multiple/select-multiple.component';
import { SelectComponent } from '@shared/components/form/select/select.component';
import { SliderWithValueComponent } from '@shared/components/form/slider-with-value/slider-with-value.component';
import { TextFieldComponent } from '@shared/components/form/text-field/text-field.component';
import { TextareaComponent } from '@shared/components/form/textarea/textarea.component';
import { NavLinkComponent } from '@shared/components/links/nav-link/nav-link.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { OptionComponent } from '@shared/components/option/option.component';
import { PanelComponent } from '@shared/components/panel/panel.component';
import { PriceComponent } from '@shared/components/price/price.component';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { TagComponent } from '@shared/components/tag/tag.component';
import { NoResultComponent } from '@shared/components/no-result/no-result.component';

@NgModule({
	declarations: [
		TextFieldComponent,
		TextareaComponent,
		DividerComponent,
		ImageFullHeightComponent,
		AlertComponent,
		ButtonComponent,
		NavLinkComponent,
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
		MaskFieldComponent,
		CheckboxBaseComponent,
		CheckboxChipComponent,
		NoResultComponent,
	],
	imports: [CommonModule, PrimengModule],
	exports: [
		TextFieldComponent,
		TextareaComponent,
		DividerComponent,
		ImageFullHeightComponent,
		AlertComponent,
		NavLinkComponent,
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
		MaskFieldComponent,
		CheckboxBaseComponent,
		CheckboxChipComponent,
		NoResultComponent,
	],
})
export class ComponentModule {}
