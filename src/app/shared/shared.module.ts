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

@NgModule({
	declarations: [
		SquareButtonComponent,
		TextFieldComponent,
		HorizontalDividerComponent,
		AuthLayoutComponent,
		ImageFullHeightComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		FontAwesomeModule,
		ReactiveFormsModule,
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
	],
})
export class SharedModule {}
