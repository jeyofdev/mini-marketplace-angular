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
import { catchError, from, map, Observable, of, throwError } from 'rxjs';

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
	): Observable<UserCredential> {
		return from(signInWithPopup(this.auth, provider)).pipe(
			catchError(error => {
				this.handleError(error);
				return throwError(() => new Error('Login failed'));
			}),
		);
	}

	login(email: string, password: string): Observable<UserCredential> {
		return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
			catchError(error => {
				this.handleError(error);
				return throwError(() => new Error('Login failed'));
			}),
		);
	}

	register(email: string, password: string): Observable<UserCredential> {
		return from(
			createUserWithEmailAndPassword(this.auth, email, password),
		).pipe(
			catchError(error => {
				this.handleError(error);
				return throwError(() => new Error('Register failed'));
			}),
		);
	}

	logout(): Observable<void> {
		return from(signOut(this.auth)).pipe(
			map(() => {
				this.router.navigateByUrl('/dashboard/auth/login');
			}),
			catchError(error => {
				this.handleError(error);
				return of();
			}),
		);
	}

	getAuthLocal(): any {
		const token = localStorage.getItem('user');
		const user = JSON.parse(token as string);
		return user;
	}

	setErrorMessage(errorCode: string): string | null {
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
	): Observable<void> {
		return from(updateProfile(user, updatedDatas)).pipe(
			map(() => {
				this.userData = { ...user, ...updatedDatas };
			}),
			catchError(error => this.handleError(error)),
		);
	}

	private handleError(error: unknown): Observable<void> {
		if (error instanceof FirebaseError) {
			this.setErrorMessage(error.code);
		}
		return of();
	}
}
