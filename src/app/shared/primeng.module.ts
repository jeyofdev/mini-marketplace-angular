import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
	exports: [
		ButtonModule,
		InputTextModule,
		InputTextareaModule,
		MessageModule,
		MessagesModule,
		AvatarModule,
		DividerModule,
		ToastModule,
		InputNumberModule,
		DropdownModule,
	],
})
export class PrimengModule {}
