import { Injectable } from '@angular/core';
import { IColorCheckbox, ISelectItem } from '../interfaces/input.interface';
import { ProductSizeEnum } from '../enum/product.enum';
import { ICategoryTableColumns } from '../interfaces/table.interface';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	getAllSizes(): ISelectItem[] {
		return [
			{ value: ProductSizeEnum.M, label: ProductSizeEnum.M },
			{ value: ProductSizeEnum.L, label: ProductSizeEnum.L },
			{ value: ProductSizeEnum.S, label: ProductSizeEnum.S },
			{ value: ProductSizeEnum.XL, label: ProductSizeEnum.XL },
		];
	}

	getAllColors(): IColorCheckbox[] {
		return [
			{
				color: '#f87575',
				label: 'red',
				name: 'red',
			},
			{
				color: '#5c95ff',
				label: 'blue',
				name: 'blue',
			},
			{
				color: '#2EC12B',
				label: 'green',
				name: 'green',
			},
			{
				color: '#FFFF5C',
				label: 'yellow',
				name: 'yellow',
			},
			{
				color: '#952265',
				label: 'purple',
				name: 'purple',
			},
		];
	}

	getColsCategories(): ICategoryTableColumns[] {
		return [
			{
				field: 'id',
				header: 'ID',
			},
			{
				field: 'name',
				header: 'Name',
			},
			{
				field: 'description',
				header: 'Description',
			},
		];
	}
}
