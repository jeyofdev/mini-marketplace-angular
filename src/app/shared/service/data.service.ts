import { Injectable } from '@angular/core';
import { IColorCheckbox, ISelectItem } from '../interfaces/input.interface';
import { ProductSizeEnum } from '../enum/product.enum';
import {
	ITableColumns,
	IRowsPerPageSelectOptions,
} from '../interfaces/table.interface';
import { ISocialProvider } from '../model/social-provider.model';
import { ProviderEnum } from '../enum/provider.enum';
import { INavLink } from '../interfaces/link.interface';

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

	getColsCategories(): ITableColumns[] {
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

	getColsProducts(): ITableColumns[] {
		return [
			{
				field: 'modelName',
				header: 'Model name',
			},
			{
				field: 'brandName',
				header: 'Brand name',
			},
			{
				field: 'category',
				header: 'Category',
			},
			{
				field: 'size',
				header: 'Size',
			},
			{
				field: 'quantity',
				header: 'Quantity',
			},
			{
				field: 'price',
				header: 'Price',
			},
			{
				field: 'color',
				header: 'Color',
			},
		];
	}

	getDashboardNavLinks(): INavLink[] {
		return [
			{
				label: 'Dashboard',
				routerLink: '/dashboard/home',
				icon: 'fa-solid fa-chart-simple',
			},
			{
				label: 'Products',
				routerLink: '/dashboard/products',
				icon: 'fa-solid fa-cart-shopping',
			},
			{
				label: 'Categories',
				routerLink: '/dashboard/categories',
				icon: 'fa-solid fa-tags',
			},
		];
	}

	getAuthProviders(): ISocialProvider[] {
		return [
			{
				label: 'Connect with Google',
				icon: 'fa-brands fa-google',
				color: 'primary',
				size: '100%',
				outline: false,
				name: ProviderEnum.GOOGLE,
			},
			{
				label: 'Connect with Github',
				icon: 'fa-brands fa-github',
				color: 'primary',
				size: '100%',
				outline: false,
				name: ProviderEnum.GITHUB,
			},
		];
	}

	getRowsPerPageSelectOptions(): IRowsPerPageSelectOptions[] {
		return [
			{ label: 5, value: 5 },
			{ label: 10, value: 10 },
			{ label: 25, value: 25 },
			{ label: 50, value: 50 },
		];
	}
}
