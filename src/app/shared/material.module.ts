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
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
		MatSliderModule,
		MatRadioModule,
		MatCheckboxModule,
	],
})
export class MaterialModule {}
