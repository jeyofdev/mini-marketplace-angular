/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Injectable, NgZone } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
	Auth,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	userData: any;
	errorMessage!: string | null;

	constructor(
		private router: Router,
		private auth: Auth,
		public ngZone: NgZone,
	) {
		onAuthStateChanged(this.auth, (user: any) => {
			if (user) {
				this.userData = user;
				localStorage.setItem('user', JSON.stringify(this.userData));
				JSON.parse(localStorage.getItem('user') as string);
			} else {
				localStorage.setItem('user', 'null');
				JSON.parse(localStorage.getItem('user') as string);
			}
		});
	}

	async loginWithPopup(provider: GoogleAuthProvider | GithubAuthProvider) {
		await signInWithPopup(this.auth, provider);
		this.router.navigateByUrl('/dashboard');
	}

	async login(email: string, password: string) {
		this.resetErrorMessage();

		try {
			const result = await signInWithEmailAndPassword(
				this.auth,
				email,
				password,
			);

			this.userData = result.user;
			this.ngZone.run(() => {
				this.router.navigateByUrl('/dashboard');
			});
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				this.setErrorMessage(error.code);
			}
		}
	}

	async register(email: string, password: string) {
		this.resetErrorMessage();

		try {
			const result = await createUserWithEmailAndPassword(
				this.auth,
				email,
				password,
			);
			this.userData = result.user;
			this.ngZone.run(() => {
				// this.router.navigateByUrl('/dashboard');
			});
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				this.setErrorMessage(error.code);
			}
		}
	}

	logout() {
		signOut(this.auth).then(() =>
			this.router.navigateByUrl('/dashboard/auth/login'),
		);
	}

	getAuthLocal() {
		const token = localStorage.getItem('user');
		const user = JSON.parse(token as string);
		console.log(user);
	}

	private setErrorMessage(errorCode: string) {
		if (
			errorCode === 'auth/wrong-password' ||
			errorCode === 'auth/user-not-found'
		) {
			this.errorMessage =
				'Your credentials are incorrect. Please double-check your login details and try again.';
		} else if (errorCode === 'auth/email-already-in-use') {
			this.errorMessage = 'Email is invalid or already taken';
		}
	}

	private resetErrorMessage(): void {
		this.errorMessage = null;
	}
}
