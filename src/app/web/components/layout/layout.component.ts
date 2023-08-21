import { Component, HostListener, OnInit } from '@angular/core';
import { ResizeService } from '../../../shared/service/resize.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
	windowSize!: number;

	constructor(private resizeService: ResizeService) {}

	ngOnInit(): void {
		this.windowSize = this.resizeService.getScreenWidth();
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.windowSize = window.innerWidth;
	}
}
