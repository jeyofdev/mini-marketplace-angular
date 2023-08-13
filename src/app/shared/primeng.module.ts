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
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { SliderModule } from 'primeng/slider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PasswordModule } from 'primeng/password';
import { BreadcrumbModule } from 'primeng/breadcrumb';

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
		MenuModule,
		DialogModule,
		SidebarModule,
		CheckboxModule,
		TooltipModule,
		SliderModule,
		ScrollPanelModule,
		PasswordModule,
		BreadcrumbModule,
	],
})
export class PrimengModule {}
