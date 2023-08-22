import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/service/data.service';
import { ISelectItem } from 'src/app/shared/interfaces/input.interface';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	sizes!: ISelectItem[];

	public receivedRating!: string;

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.sizes = this.dataService.getAllSizes();
	}

	public receiveRatingClick(message: string): void {
		this.receivedRating = message;
	}
}
