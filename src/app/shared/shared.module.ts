import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SquareButtonComponent } from './components/button/square-button/square-button.component';
import { TextFieldComponent } from './components/input/text-field/text-field.component';
import { HorizontalDividerComponent } from './components/divider/horizontal-divider/horizontal-divider.component';

@NgModule({
	declarations: [
		SquareButtonComponent,
		TextFieldComponent,
		HorizontalDividerComponent,
	],
	imports: [CommonModule, MaterialModule, FontAwesomeModule],
	exports: [
		MaterialModule,
		FontAwesomeModule,
		SquareButtonComponent,
		TextFieldComponent,
		HorizontalDividerComponent,
	],
})
export class SharedModule {}
