import { Injectable } from '@angular/core';
import {
	Auth,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private router: Router,
		private auth: Auth,
	) {}

	async loginWithPopup(provider: GoogleAuthProvider | GithubAuthProvider) {
		await signInWithPopup(this.auth, provider);
		this.router.navigateByUrl('/dashboard');
	}
}
