import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		FontAwesomeModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		StoreModule.forRoot(
			{},
			{
				runtimeChecks: {
					strictActionTypeUniqueness: true,
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			},
		),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
