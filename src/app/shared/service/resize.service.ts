import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ResizeService {
	getScreenWidth(): number {
		return window.innerWidth;
	}
}
