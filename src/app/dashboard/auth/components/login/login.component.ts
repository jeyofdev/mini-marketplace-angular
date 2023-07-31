import { Component, OnInit } from '@angular/core';
import {
	IconDefinition,
	faGoogle,
	faGithub,
} from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	hidePassword!: boolean;
	faGoogle: IconDefinition = faGoogle;
	faGithub: IconDefinition = faGithub;

	ngOnInit(): void {
		this.hidePassword = false;
	}

	shownPassword(): void {
		this.hidePassword = !this.hidePassword;
	}
}
