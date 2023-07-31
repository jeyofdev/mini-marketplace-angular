import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SquareButtonComponent } from './components/button/square-button/square-button.component';

@NgModule({
	declarations: [SquareButtonComponent],
	imports: [CommonModule, MaterialModule, FontAwesomeModule],
	exports: [MaterialModule, FontAwesomeModule, SquareButtonComponent],
})
export class SharedModule {}
