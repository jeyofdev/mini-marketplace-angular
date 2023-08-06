import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	exports: [
		MatButtonModule,
		MatGridListModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		MatCardModule,
		MatMenuModule,
		MatDialogModule,
		MatSnackBarModule,
		MatSelectModule,
	],
})
export class MaterialModule {}
