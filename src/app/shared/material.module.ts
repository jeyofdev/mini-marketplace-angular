import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
	exports: [
		MatButtonModule,
		MatGridListModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		MatCardModule,
		MatMenuModule,
	],
})
export class MaterialModule {}
