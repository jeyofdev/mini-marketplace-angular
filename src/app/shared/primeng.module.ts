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
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { RadioButtonModule } from 'primeng/radiobutton';

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
		TableModule,
		PaginatorModule,
		ProgressSpinnerModule,
		ConfirmDialogModule,
		BadgeModule,
		TagModule,
		ChipModule,
		RadioButtonModule,
	],
})
export class PrimengModule {}
