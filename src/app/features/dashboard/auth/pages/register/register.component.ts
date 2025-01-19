import { Component, OnInit } from '@angular/core';

import { IImage } from '@shared/model/image.model';
import { ISocialProvider } from '@shared/model/social-provider.model';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';
import { DataService } from '@shared/service/data.service';
import { IUser } from '@core/model/user.model';
import { UserActions } from '@core/state/user/actions/user-index.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseError } from '@angular/fire/app';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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

	registerWithEmail(form: FormGroup) {
		this.authService
			.register(form.value.email, form.value.password.password)
			.pipe(
				map(currentUser => {
					const newUser: IUser = {
						account: {
							createdAt: currentUser.user.metadata.creationTime ?? '',
							lastLogin: currentUser.user.metadata.lastSignInTime ?? '',
						},
						profile: {
							firstname: form.value.personnalInfos.firstname,
							lastname: form.value.personnalInfos.lastname,
							username: form.value.personnalInfos.username,
							email: currentUser.user.email ?? '',
							phone: currentUser.user.phoneNumber ?? '',
							avatar: currentUser.user.photoURL ?? '',
						},
						list: [],
					};

					this.store.dispatch(
						UserActions.informations.addUser({
							payload: { userId: currentUser.user.uid, data: newUser },
						}),
					);

					this.formErrorMessage = null;
					form.reset();
					this.router.navigateByUrl('/home');
				}),
				catchError((error: unknown) => {
					if (error instanceof FirebaseError) {
						this.formErrorMessage = this.authService.setErrorMessage(
							error.code,
						);
					}
					return of(null);
				}),
			);
	}

	private initImage(): void {
		this.image = {
			src: 'assets/img/auth/register.jpg',
			alt: '',
			position: 'top',
		};
	}
}
