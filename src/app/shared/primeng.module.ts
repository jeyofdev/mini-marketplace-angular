import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';

@NgModule({
	exports: [
		ButtonModule,
		InputTextModule,
		MessageModule,
		MessagesModule,
		AvatarModule,
		DividerModule,
	],
})
export class PrimengModule {}
