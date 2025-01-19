import { DataService } from '@shared/service/data.service';
import { Component, OnInit } from '@angular/core';
import { IImage } from '@shared/model/image.model';
import { ISocialProvider } from '@shared/model/social-provider.model';
import { AuthService } from '@shared/service/auth.service';
import { UserActions } from '@core/state/user/actions/user-index.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseError } from '@angular/fire/app';
import { catchError, map, Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	socialProviders$!: Observable<ISocialProvider[]>;
	image!: IImage;

	formErrorMessage!: string | null;

	constructor(
		private authService: AuthService,
		private dataService: DataService,
		private router: Router,
		private store: Store,
	) {}

	ngOnInit(): void {
		this.socialProviders$ = this.dataService.getAuthProviders();
		this.initImage();
	}

	loginWithEmail(form: FormGroup) {
		this.authService.login(form.value.email, form.value.password).pipe(
			map(currentUser => {
				this.store.dispatch(
					UserActions.informations.loadUser({
						payload: { userId: currentUser.user.uid },
					}),
				);

				this.formErrorMessage = null;
				form.reset();
				this.router.navigateByUrl('/home');
			}),
			catchError((error: unknown) => {
				if (error instanceof FirebaseError) {
					this.formErrorMessage = this.authService.setErrorMessage(error.code);
				}
				return of(null);
			}),
		);
	}

	private initImage(): void {
		this.image = {
			src: 'assets/img/auth/login.jpg',
			alt: '',
			position: 'top',
		};
	}
}
