/* eslint-disable @typescript-eslint/no-explicit-any */
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
	updateProfile,
	User,
	UserCredential,
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

	loginWithPopup(
		provider: GoogleAuthProvider | GithubAuthProvider,
	): Promise<UserCredential> {
		return signInWithPopup(this.auth, provider);
	}

	login(email: string, password: string): Promise<UserCredential> {
		return signInWithEmailAndPassword(this.auth, email, password);
	}

	register(email: string, password: string): Promise<UserCredential> {
		return createUserWithEmailAndPassword(this.auth, email, password);
	}

	logout() {
		signOut(this.auth).then(() =>
			this.router.navigateByUrl('/dashboard/auth/login'),
		);
	}

	getAuthLocal() {
		const token = localStorage.getItem('user');
		const user = JSON.parse(token as string);
		return user;
	}

	setErrorMessage(errorCode: string) {
		if (
			errorCode === 'auth/wrong-password' ||
			errorCode === 'auth/user-not-found'
		) {
			this.errorMessage =
				'Your credentials are incorrect. Please double-check your login details and try again.';
		} else if (errorCode === 'auth/email-already-in-use') {
			this.errorMessage = 'Email is invalid or already taken';
		}

		return this.errorMessage;
	}

	private resetErrorMessage(): void {
		this.errorMessage = null;
	}

	private updateUser(
		user: User,
		updatedDatas: { displayName?: string; photoURL?: string },
	): void {
		updateProfile(user, updatedDatas)
			.then(updatedUser => {
				this.userData = updatedUser;
			})
			.catch((error: unknown) => {
				if (error instanceof FirebaseError) {
					this.setErrorMessage(error.code);
				}
			});
	}
}
