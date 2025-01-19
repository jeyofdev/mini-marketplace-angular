import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from '@shared/module/primeng.module';
import { ComponentModule } from '@shared/module/component.module';
import { PipeModule } from './module/pipe.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		FontAwesomeModule,
		PrimengModule,
		ComponentModule,
		PipeModule,
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		PrimengModule,
		ComponentModule,
		PipeModule,
	],
})
export class SharedModule {}
