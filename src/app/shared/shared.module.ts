import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SquareButtonComponent } from './components/button/square-button/square-button.component';
import { TextFieldComponent } from './components/input/text-field/text-field.component';

@NgModule({
	declarations: [SquareButtonComponent, TextFieldComponent],
	imports: [CommonModule, MaterialModule, FontAwesomeModule],
	exports: [
		MaterialModule,
		FontAwesomeModule,
		SquareButtonComponent,
		TextFieldComponent,
	],
})
export class SharedModule {}
