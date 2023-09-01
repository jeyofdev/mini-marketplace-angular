import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shared/model/product.model';
import { ICategory } from '../../../shared/model/category.model';

@Component({
	selector: 'app-no-result',
	templateUrl: './no-result.component.html',
	styleUrls: ['./no-result.component.scss'],
})
export class NoResultComponent {
	@Input() items!: IProduct[] | ICategory[];
}
