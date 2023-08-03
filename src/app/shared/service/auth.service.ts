/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Injectable, NgZone } from '@angular/core';
import {
	Auth,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	userData: any;

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
		} catch (error) {
			console.log(error);
		}
	}

	async register(email: string, password: string) {
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
		} catch (error) {
			console.log(error);
		}
	}

	getAuthLocal() {
		const token = localStorage.getItem('user');
		const user = JSON.parse(token as string);
		console.log(user);
	}
}
