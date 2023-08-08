import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
	exports: [
		ButtonModule,
		InputTextModule,
		MessageModule,
		MessagesModule,
		AvatarModule,
	],
})
export class PrimengModule {}
