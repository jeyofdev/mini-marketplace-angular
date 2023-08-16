import { Component, Input, OnInit } from '@angular/core';
import { CurrencyEnum } from '../../enum/properties.enum';

@Component({
	selector: 'app-price',
	templateUrl: './price.component.html',
	styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit {
	@Input() value!: number;
	@Input() prefix!: boolean;
	@Input() suffix!: boolean;
	@Input() currency!: CurrencyEnum;

	icon!: string;

	ngOnInit(): void {
		switch (this.currency) {
			case CurrencyEnum.USD:
				this.icon = 'fa-solid fa-dollar-sign';
				break;
			case CurrencyEnum.GBP:
				this.icon = 'fa-solid fa-sterling-sign';
				break;
			case CurrencyEnum.EUR:
				this.icon = 'fa-solid fa-euro-sign';
				break;

			default:
				break;
		}
	}
}
